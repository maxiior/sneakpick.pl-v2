import React from "react";
import styled from "styled-components";
import wtt from "assets/wtt.png";

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${wtt});
  height: 250px;
  width: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  color: ${({ theme }) => theme.white};
  font-size: 70px;
  user-select: none;
  font-weight: 500;

  @media only screen and (max-width: 1200px) {
    font-size: 60px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 8vw;
  }
`;

const Wrapper = styled.main`
  display: block;
  height: 100%;
`;

const WTT = () => {
  return (
    <Wrapper>
      <Header>WANT TO TRADE</Header>
    </Wrapper>
  );
};

export default WTT;
