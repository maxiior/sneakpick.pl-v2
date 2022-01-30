import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppDispatch } from "hooks/useAppDispatch";
import {
  closeMenuView,
  displayCommunicatorIcon,
} from "store/interface/actions";
import { logout as logoutAction } from "store/auth/actions";

const Wrapper = styled(Link)`
  color: ${({ theme }) => theme.white};
  width: 100%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  user-select: none;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;

  :hover {
    background-color: ${({ theme }) => theme.blue};
  }
`;

const Option = ({
  to,
  content,
  logout,
}: {
  to: string;
  content: string;
  logout?: boolean;
}) => {
  const dispatch = useAppDispatch();

  return (
    <Wrapper
      to={to}
      onClick={() => {
        if (logout) dispatch(logoutAction());
        dispatch(displayCommunicatorIcon());
        dispatch(closeMenuView());
      }}
    >
      {content}
    </Wrapper>
  );
};

export default Option;
