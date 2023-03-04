import React from "react";
import styled from "styled-components";
import Categories from "./Categories";
import PostsList from "./PostsList";
import RightPanel from "./RightPanel";

const Wrapper = styled.div`
  width: 100%;
  padding: 30px;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_SM}) {
    padding: 30px 0;
  }
`;

const BottomPanel = () => {
  return (
    <Wrapper>
      <Categories />
      <PostsList />
      <RightPanel />
    </Wrapper>
  );
};

export default BottomPanel;
