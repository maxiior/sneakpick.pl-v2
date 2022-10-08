import React from "react";
import styled from "styled-components";
import TopPanel from "./TopPanel";
import Seller from "./Seller";

const Wrapper = styled.div``;

const BottomPanel = () => {
  return (
    <Wrapper>
      <TopPanel />
      <Seller number={1} />
      <Seller number={2} />
      <Seller number={3} />
      <Seller number={4} />
      <Seller number={5} />
    </Wrapper>
  );
};

export default BottomPanel;
