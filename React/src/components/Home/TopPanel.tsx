import React from "react";
import styled from "styled-components";
import home from "assets/home.png";
import { Link } from "react-router-dom";
import { routes } from "routes";

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${home});
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

const Button = styled(Link)<{ buy?: Boolean }>`
  background-color: ${({ theme, buy }) => (buy ? theme.green : theme.red)};
  width: 220px;
  font-size: 35px;
  text-align: center;
  padding: 15px;
  font-weight: 500;
  cursor: pointer;
  border-radius: ${({ theme }) => theme._5px};
  text-decoration: none;
  color: ${({ theme }) => theme.white};
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  :first-child {
    margin-left: 0;
  }

  :hover {
    filter: brightness(1.05);
  }

  @media only screen and (max-width: 768px) {
    width: 28vw;
    height: 9vw;
    font-size: 4vw;
  }
`;

const Header = styled.div`
  font-size: 110px;
  user-select: none;
  font-weight: 500;
  text-align: center;

  @media only screen and (max-width: 1200px) {
    font-size: 90px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 12vw;
  }
`;

const Container = styled.div``;

const SubContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TopPanel: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Header>SNEAKPICK</Header>
        <SubContainer>
          <Button to={routes.WTB} buy>
            BUY
          </Button>
          <Button to={routes.WTS}>SELL</Button>
        </SubContainer>
      </Container>
    </Wrapper>
  );
};

export default TopPanel;
