import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { routes } from "routes";

const useAuthenticated = () => {
  const isAuthenticated = useSelector(
    (state) => state.authSlice.isAuthenticated
  );
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) history.replace(routes.HOME);
  }, []);
};

export default useAuthenticated;
