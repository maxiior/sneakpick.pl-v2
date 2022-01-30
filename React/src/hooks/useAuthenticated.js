import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { routes } from "routes";

const useAuthenticated = () => {
  const { isAuthenticated, pending } = useSelector((state) => state.authSlice);
  const history = useHistory();

  useEffect(() => {
    if (!pending && !isAuthenticated) history.replace(routes.HOME);
  }, [pending, history, isAuthenticated]);
};

export default useAuthenticated;
