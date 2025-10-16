import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../features/product/productSlice";
import { toast } from "react-toastify";

const categories = ["Electronics", "Furniture", "Vehicles", "Books", "Other"];

const CreateAdPage = () => {
  const dispatch = useDispatch();
  const { isCreating } = useSelector((state) => state.product);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    images: [], // array of { base64, preview }
  });

  // Text input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Image upload, convert to base64 and preview url
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setForm((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            { base64: reader.result, preview: URL.createObjectURL(file) },
          ],
        }));
      };
      e.target.value = "";
    }
  };

  const handleRemoveImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const validateForm = () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (!form.description.trim()) {
      toast.error("Description is required");
      return false;
    }
    if (!form.price) {
      toast.error("Price is required");
      return false;
    }
    if (!form.category) {
      toast.error("Category is required");
      return false;
    }
    if (form.images.length < 2) {
      toast.error("Add at least 2 images");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Build JSON ad data: images is array of base64
    const adData = {
      title: form.title,
      description: form.description,
      price: form.price,
      category: form.category,
      images: form.images.map((imgObj) => imgObj.base64),
    };

    try {
      await dispatch(createProduct(adData)).unwrap();
      toast.success("Ad posted successfully!");
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        images: [],
      });
    } catch (error) {
      toast.error(error || "Failed to post ad");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        className="max-w-md w-full bg-white p-6 rounded shadow"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create New Ad</h2>
        <input
          className="mb-2 p-2 border rounded w-full"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          className="mb-2 p-2 border rounded w-full"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={3}
        />
        <input
          className="mb-2 p-2 border rounded w-full"
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <select
          className="mb-2 p-2 border rounded w-full"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
        <label className="block mb-1 font-semibold">Add Images</label>
        <input
          className="mb-3 p-2 border rounded w-full"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className="flex gap-2 mb-4 flex-wrap">
          {form.images.map((img, idx) => (
            <div key={idx} className="relative group">
              <img
                src={img.preview}
                alt="preview"
                className="w-20 h-20 object-cover border rounded"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 text-xs opacity-80 hover:opacity-100"
                onClick={() => handleRemoveImage(idx)}
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="submit"
          disabled={isCreating}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-200 ${
            isCreating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isCreating ? "Posting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateAdPage;
