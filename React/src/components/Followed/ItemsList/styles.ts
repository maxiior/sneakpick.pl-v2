import styled from "styled-components";
import { Link } from "react-router-dom";

export const Text = styled.div`
  font-size: 24px;
  margin-top: 80px;
  text-align: center;
`;

export const Holder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;

export const Button = styled(Link)`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  padding: 15px;
  cursor: pointer;
  border-radius: 10px;
  text-decoration: none;
  font-size: 14px;
`;
