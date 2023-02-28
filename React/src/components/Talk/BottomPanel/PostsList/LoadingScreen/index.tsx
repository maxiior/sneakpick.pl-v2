import React from "react";
import styled from "styled-components";
import DummyQuestion from "./DummyQuestion";

const Wrapper = styled.div`
  width: 100%;
`;

const LoadingScreen = () => {
  const rows = [];
  for (let i = 0; i < 5; i++) rows.push(<DummyQuestion />);

  return <Wrapper>{rows}</Wrapper>;
};

export default LoadingScreen;
