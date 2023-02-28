import React from "react";
import styled from "styled-components";
import image from "assets/proxy.png";
import { routes } from "routes";
import { Link } from "react-router-dom";

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${image});
  height: 350px;
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

const Title = styled.div``;

const Button = styled(Link)`
  font-size: 12px;
  background-color: ${({ theme }) => theme.black};
  text-decoration: none;
  color: ${({ theme }) => theme.white};
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.1s;
  border-radius: ${({ theme }) => theme.radious_SM};

  :hover {
    background-color: ${({ theme }) => theme.blue};
  }

  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    font-size: 2vw;
  }
`;

const Holder = styled.div`
  display: flex;
  justify-content: center;
`;

const TopPanel = () => {
  return (
    <Wrapper>
      <div>
        <Title>PROXY</Title>
        <Holder>
          <Button to={routes.PROXY_ADDER}>Dodaj</Button>
        </Holder>
      </div>
    </Wrapper>
  );
};

export default TopPanel;
