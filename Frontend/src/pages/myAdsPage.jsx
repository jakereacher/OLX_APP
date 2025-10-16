import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAds, clearProductError } from "../features/product/productSlice";

const MyAdsPage = () => {
  const dispatch = useDispatch();
  const { myAds, isLoadingMyAds, myAdsError, myAdsMessage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchMyAds());
    return () => {
      dispatch(clearProductError());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-center">My Ads</h2>

        {myAdsMessage && (
          <p className="text-green-500 text-center mb-3">{myAdsMessage}</p>
        )}
        {myAdsError && (
          <p className="text-red-500 text-center mb-3">{myAdsError}</p>
        )}
        {isLoadingMyAds ? (
          <p className="text-center text-gray-500">Loading your ads...</p>
        ) : myAds.length === 0 ? (
          <p className="text-center text-gray-500">You have no ads yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myAds.map((ad) => (
              <div
                key={ad._id}
                className="border rounded p-4 flex flex-col shadow"
              >
                <h3 className="text-lg font-semibold mb-1">{ad.title}</h3>
                <p className="text-gray-600 mb-1">{ad.description}</p>
                <span className="font-bold text-blue-600 mb-1">
                  ₹{ad.price}
                </span>
                <span className="text-sm text-gray-500 mb-1">
                  Category: {ad.category}
                </span>
                <div className="flex gap-2 mb-2">
                  {ad.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`ad-img-${idx}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(ad.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAdsPage;
