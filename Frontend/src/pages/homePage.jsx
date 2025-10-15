import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../features/auth/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { logInMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    if (logInMessage) {
      toast.success(logInMessage,{ toastId: "login-success" });
      dispatch(clearError()); 
    }
  }, [logInMessage, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">This is the Home Page</h1>
    </div>
  );
};

export default HomePage;
