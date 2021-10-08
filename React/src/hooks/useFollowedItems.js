import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowedItems } from "store/followed/actions";

const useFollowedItems = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authSlice.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchFollowedItems());
  }, [isAuthenticated]);
};

export default useFollowedItems;
