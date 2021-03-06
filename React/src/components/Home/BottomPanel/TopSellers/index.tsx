import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const TopPanel = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
`;

const Header = styled.div`
  color: ${({ theme }) => theme.black};
  font-weight: 500;
  font-size: 20px;
`;

const ShowAll = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.blue};
  text-decoration: none;
  margin-left: 10px;
`;

const TopSellers: React.FC = () => {
  return (
    <Wrapper>
      <TopPanel>
        <Header>Top sprzedawcy</Header>
        <ShowAll to="/">Zobacz wszystkie</ShowAll>
      </TopPanel>
    </Wrapper>
  );
};

export default TopSellers;
