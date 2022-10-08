import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BottomPanel from "./BottomPanel";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const TopPanel = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  color: ${({ theme }) => theme.black};
  font-weight: 500;
  font-size: 20px;
`;

const ShowAll = styled(Link)`
  font-size: ${({ theme }) => theme.font_size_MD};
  color: ${({ theme }) => theme.blue};
  text-decoration: none;
  margin-left: 10px;
`;

const TopSellers: React.FC = () => {
  return (
    <Wrapper>
      <TopPanel>
        <Header>Top sprzedawcy</Header>
        <ShowAll to="/">Zobacz wszystko</ShowAll>
      </TopPanel>
      <BottomPanel />
    </Wrapper>
  );
};

export default TopSellers;
