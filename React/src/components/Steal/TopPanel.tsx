import React from "react";
import styled from "styled-components";
import image from "assets/steal.png";
import { routes } from "routes";
import { Link } from "react-router-dom";
import { useAppSelector } from "hooks/useAppSelector";
import { STEAL_ADDER_ROLES } from "constants/roleAuthorizations";

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

  @media only screen and (max-width: ${({ theme }) => theme.max_width_XL}) {
    font-size: 60px;
  }
  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    font-size: 8vw;
  }
`;

const Paragraph = styled.div`
  font-size: 14px;
  text-align: center;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    font-size: 2vw;
  }
`;

const Title = styled.div`
  text-align: center;
`;

const Button = styled(Link)`
  font-size: 12px;
  background-color: ${({ theme }) => theme.black};
  text-decoration: none;
  color: ${({ theme }) => theme.white};
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.1s;
  border-radius: ${({ theme }) => theme.radious_SM};
  margin-top: 10px;

  :hover {
    background-color: ${({ theme }) => theme.blue};
  }

  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    font-size: 2vw;
  }
`;

const Container = styled.div`
  position: relative;
`;

const Holder = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
`;

const TopPanel = () => {
  const { role } = useAppSelector((state) => state.authSlice);

  return (
    <Wrapper>
      <Container>
        <Title>STEAL</Title>
        <Paragraph>Steale | Early Access | Promocje | Dropy</Paragraph>
        <Holder>
          {STEAL_ADDER_ROLES.includes(role) && (
            <Button to={routes.STEAL_ADDER}>Dodaj</Button>
          )}
        </Holder>
      </Container>
    </Wrapper>
  );
};

export default TopPanel;
