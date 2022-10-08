import React from "react";
import TopPanel from "components/Talk/TopPanel";
import BottomPanel from "components/Talk/BottomPanel";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100%;
  background-color: #fcfcfc;
`;

const Talk = () => {
  return (
    <Wrapper>
      <TopPanel />
      <BottomPanel />
    </Wrapper>
  );
};

export default Talk;
