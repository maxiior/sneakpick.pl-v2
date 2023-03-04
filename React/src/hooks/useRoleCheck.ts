import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "routes";
import { useAppSelector } from "./useAppSelector";

const useRoleCheck = (requiredRole: string[]) => {
  const { role, pending } = useAppSelector((state) => state.authSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pending && !requiredRole.includes(role))
      navigate(routes.HOME, { replace: true });
  }, [pending, navigate, role]);
};

export default useRoleCheck;
