// src/components/Navbar.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, clearError } from "../features/auth/authSlice";
import { toast } from "react-toastify";

export default function Navbar() {
  const dispatch = useDispatch();
  const { authUser, isLoggingOut, logOutMessage, logOutError } = useSelector(
    (state) => state.auth
  );

  // Show toast messages
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
        <a href="/login" className="hover:underline">
          Login
        </a>
      )}
    </nav>
  );
}
