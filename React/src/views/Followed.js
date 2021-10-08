import React from "react";
import { useDispatch } from "react-redux";
import { fetchFollowedItems } from "store/followed/actions";

const Followed = () => {
  const dispatch = useDispatch();

  return <div onClick={() => dispatch(fetchFollowedItems())}>Followed</div>;
};

export default Followed;
