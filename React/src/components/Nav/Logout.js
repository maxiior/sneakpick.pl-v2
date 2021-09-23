import React from "react";
import http from "api/http";
import styled from "styled-components";
import { logout } from "api/services/auth.service";

const StyledLogout = styled.div`
  margin: 0 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.blue};
  cursor: pointer;
`;

const Logout = () => {
  const Blacklisting = () => {
    logout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    http.defaults.headers["Authorization"] = null;
  };

  return <StyledLogout onClick={Blacklisting}>LOGOUT</StyledLogout>;
};

export default Logout;
