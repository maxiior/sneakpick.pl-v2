import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "routes";

const useAuthenticated = () => {
  const { isAuthenticated, pending } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pending && !isAuthenticated) navigate.replace(routes.HOME);
  }, [pending, navigate, isAuthenticated]);
};

export default useAuthenticated;
