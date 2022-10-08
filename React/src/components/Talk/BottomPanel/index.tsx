import React from "react";
import styled from "styled-components";
import Categories from "./Categories";
import PostsList from "./PostsList";
import RightPanel from "./RightPanel";

const Wrapper = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: space-between;
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
