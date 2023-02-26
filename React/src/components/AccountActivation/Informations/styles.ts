import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";

export const Text = styled.div<{ $error?: boolean }>`
  text-align: justify;
  text-justify: inter-word;
  font-size: 14px;

  ${({ $error }) =>
    $error &&
    css`
      background-color: ${({ theme }) => theme.red};
      padding: 10px;
      color: ${({ theme }) => theme.white};
    `}
`;

export const Header = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.veryDarkGrey};
  margin-bottom: 10px;
`;

export const Paragraph = styled.div`
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 14px;
`;

export const Holder = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.blue};
  font-weight: 500;
  padding: 5px 0px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

export const Arrow = styled(BsArrowUpRight)`
  margin-left: 5px;
`;
