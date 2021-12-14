import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refresh, pended } from "store/auth/actions";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh()).catch(() => {
      dispatch(pended());
    });
  }, []);
};

export default useRefreshToken;
