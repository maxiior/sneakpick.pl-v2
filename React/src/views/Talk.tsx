import React, { useState } from "react";
import TopPanel from "components/Talk/TopPanel";
import BottomPanel from "components/Talk/BottomPanel";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100%;
  background-color: #fcfcfc;
`;

const Talk = () => {
  const [category, setCategory] = useState("");

  return (
    <Wrapper>
      <TopPanel category={category} setCategory={setCategory} />
      <BottomPanel category={category} setCategory={setCategory} />
    </Wrapper>
  );
};

export default Talk;
