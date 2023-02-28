import React from "react";
import styled from "styled-components";
import TopPanel from "components/Proxy/TopPanel";
import BottomPanel from "components/Proxy/BottomPanel";

const Wrapper = styled.main`
  display: block;
  height: 100%;
`;

const Proxy = () => {
  return (
    <Wrapper>
      <TopPanel />
      <BottomPanel />
    </Wrapper>
  );
};

export default Proxy;
