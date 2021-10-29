import React from "react";
import styled from "styled-components";
import wtb from "assets/wtb.png";
import { Link } from "react-router-dom";

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  //background-image: url(${wtb});
  background-color: black;
  height: 350px;
  width: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  color: ${({ theme }) => theme.white};

  @media only screen and (max-width: 1200px) {
    font-size: 6vw;
  }
  @media only screen and (max-width: 993px) {
    font-size: 8vw;
  }
  @media only screen and (max-width: 768px) {
    font-size: 10vw;
  }
`;

const Button = styled.div<{ buy?: Boolean }>`
  background-color: ${({ theme, buy }) => (buy ? theme.green : theme.red)};
  width: 250px;
  font-size: 35px;
  text-align: center;
  padding: 15px;
  font-weight: 500;
  cursor: pointer;
  border-radius: ${({ theme }) => theme._5px};
  text-decoration: none;
  color: ${({ theme }) => theme.white};

  :hover {
    filter: brightness(1.05);
  }
`;

const Header = styled.div`
  font-size: 6vw;
  user-select: none;
  font-weight: 500;
`;

const Container = styled.div``;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const TopPanel = () => {
  return (
    <Wrapper>
      <Container>
        <Header>SNEAKPICK</Header>
        <SubContainer>
          <Button buy>BUY</Button>
          <Button>SELL</Button>
        </SubContainer>
      </Container>
    </Wrapper>
  );
};

export default TopPanel;
