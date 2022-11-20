import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.lightGrey};
  margin-top: 20px;
`;

const Comments = () => {
  return <Wrapper>Comments</Wrapper>;
};

export default Comments;
