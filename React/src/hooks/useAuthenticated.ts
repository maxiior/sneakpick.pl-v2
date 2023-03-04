import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "routes";
import { useAppSelector } from "./useAppSelector";

const useAuthenticated = () => {
  const { isAuthenticated, pending } = useAppSelector(
    (state) => state.authSlice
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!pending && !isAuthenticated) navigate(routes.HOME, { replace: true });
  }, [pending, navigate, isAuthenticated]);
};

export default useAuthenticated;
