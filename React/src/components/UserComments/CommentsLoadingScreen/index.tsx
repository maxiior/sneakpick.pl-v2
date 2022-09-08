import React from "react";
import styled from "styled-components";
import DummyComment from "components/UserComments/CommentsLoadingScreen/DummyComment";

const Wrapper = styled.div`
  width: 100%;
`;

const CommentsLoadingScreen = () => {
  const rows = [];
  for (let i = 0; i < 5; i++) rows.push(<DummyComment />);

  return <Wrapper>{rows}</Wrapper>;
};

export default CommentsLoadingScreen;
