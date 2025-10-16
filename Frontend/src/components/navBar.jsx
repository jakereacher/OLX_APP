import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, clearError } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const { authUser, isLoggingOut, logOutMessage, logOutError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (logOutMessage) {
      toast.success(logOutMessage);
      dispatch(clearError());
    }
    if (logOutError) {
      toast.logOutError(logOutError);
      dispatch(clearError());
    }
  }, [logOutMessage, logOutError, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-lg">My App</div>
      {authUser ? (
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/create-ad" className="hover:underline">Create Ad</Link>
          <Link to="/my-ads" className="hover:underline">View My Ads</Link>
          <span>Welcome, {authUser.fullname}</span>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-200 ${
              isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      ) : (
        <Link to="/login" className="hover:underline">
          Login
        </Link>
      )}
    </nav>
  );
}
