import styled from "styled-components";
import home from "assets/home.png";
import { Link } from "react-router-dom";

export const Wrapper = styled.header`
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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_XL}) {
    font-size: 6vw;
  }
  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    font-size: 8vw;
  }
  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    font-size: 10vw;
  }
`;

export const Header = styled.div`
  font-size: 110px;
  user-select: none;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_XL}) {
    font-size: 90px;
  }
  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    font-size: 12vw;
  }
`;

export const Holder = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled(Link)<{ buy?: boolean }>`
  background-color: ${({ theme, buy }) => (buy ? theme.green : theme.red)};
  width: 220px;
  font-size: 30px;
  text-align: center;
  padding: 15px;
  font-weight: 500;
  cursor: pointer;
  border-radius: ${({ theme }) => theme._10px};
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

  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    width: 28vw;
    height: 9vw;
    font-size: 4vw;
  }
`;
