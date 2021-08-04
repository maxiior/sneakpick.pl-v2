import React from "react";
import axiosInstance from "axios/axios";
import styled from "styled-components";

const StyledLogout = styled.div`
  margin: 0 15px;
  cursor: pointer;
  color: #00b4ff;
  cursor: pointer;
`;

const Logout = () => {
  const Blacklisting = () => {
    const response = axiosInstance.post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
  };

  return <StyledLogout onClick={Blacklisting}>LOGOUT</StyledLogout>;
};

export default Logout;
