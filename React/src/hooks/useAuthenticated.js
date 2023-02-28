import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "routes";

const useAuthenticated = () => {
  const { isAuthenticated, pending } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pending && !isAuthenticated) navigate(routes.HOME, { replace: true });
  }, [pending, navigate, isAuthenticated]);
};

export default useAuthenticated;
