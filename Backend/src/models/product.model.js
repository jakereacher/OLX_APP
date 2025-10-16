import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: {
    type: [String],
    required: true,
    minlength: [2, 'At least 2 images required'],
    maxlength: [4, 'No more than 4 images allowed']
  },
  category: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


const Product = mongoose.model("Product",productSchema)

export default Product