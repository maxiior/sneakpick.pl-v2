import React from "react";
import styled from "styled-components";
import TopPanel from "components/Steal/TopPanel";
import BottomPanel from "components/Steal/BottomPanel";
import { useEffect } from "react";
import { useAppDispatch } from "hooks/useAppDispatch";
import { fetchSteals } from "store/steal/actions";
import { useAppSelector } from "hooks/useAppSelector";

const Wrapper = styled.main`
  display: block;
  height: 100%;
`;

const Steal = () => {
  const dispatch = useAppDispatch();
  const { all_loaded } = useAppSelector((state) => state.stealSlice);

  const bottomScrollDetection = () => {
    const position = window.scrollY;
    var limit = document.body.offsetHeight - window.innerHeight;
    if (position === limit) dispatch(fetchSteals(true));
  };

  useEffect(() => {
    if (!all_loaded) {
      dispatch(fetchSteals(false));
      document.addEventListener("scroll", bottomScrollDetection);
      return () =>
        document.removeEventListener("scroll", bottomScrollDetection);
    }
  }, [all_loaded]);

  useEffect(() => {
    return () => document.removeEventListener("scroll", bottomScrollDetection);
  }, []);

  return (
    <Wrapper>
      <TopPanel />
      <BottomPanel />
    </Wrapper>
  );
};

export default Steal;
