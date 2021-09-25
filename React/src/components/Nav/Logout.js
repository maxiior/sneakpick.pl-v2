import React from "react";
import styled from "styled-components";
import { logout } from "store/auth/actions";
import { useDispatch } from "react-redux";

const StyledLogout = styled.div`
  margin: 0 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.blue};
  cursor: pointer;
`;

const Logout = () => {
  const dispatch = useDispatch();
  const Blacklisting = () => {
    dispatch(logout());
  };

  return <StyledLogout onClick={() => Blacklisting()}>LOGOUT</StyledLogout>;
};

export default Logout;
