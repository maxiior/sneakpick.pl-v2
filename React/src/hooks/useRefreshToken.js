import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refresh } from "store/auth/actions";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh());
  }, []);
};

export default useRefreshToken;
