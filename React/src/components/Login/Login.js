import React, { useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import logo from "assets/logo_dark.png";
import axiosInstance from "axios/axios";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.form`
  background-color: white;
  padding: 50px 80px;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
`;

const StyledInput = styled.input`
  padding: 10px 12px;
  display: block;
  border: 1px solid #d6d6d6;
  outline: none;
  width: 250px;

  :focus {
    border: 1px solid #00b4ff;
    color: #00b4ff;
  }
`;

const LoginButton = styled.div`
  background-color: ${({ facebook }) => (facebook ? "#4c69ba" : "#191919")};
  color: white;
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;

  :hover {
    opacity: 0.9;
  }
`;

const Logo = styled.img`
  width: 150px;
  height: 22px;
`;

const LogoHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FieldType = styled.div`
  font-size: 12px;
  padding-bottom: 2px;
  margin-top: 15px;
`;

const PasswordForgotten = styled.span`
  font-size: 12px;
  padding-bottom: 2px;
  padding-top: 2px;
  cursor: pointer;

  :hover {
    color: #00b4ff;
  }
`;

const CLose = styled(IoMdClose)`
  right: 10px;
  top: 10px;
  cursor: pointer;
  position: absolute;
  color: #191919;

  :hover {
    color: #00b4ff;
  }
`;

const Login = ({ setLoginView }) => {
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        console.log(res.data);
      });
  };

  return (
    <Wrapper>
      <Container>
        <CLose onClick={() => setLoginView(false)} />
        <LogoHolder>
          <Logo src={logo} />
        </LogoHolder>
        <FieldType>Email</FieldType>
        <StyledInput type="text" name="email" onChange={handleChange} />
        <FieldType>Hasło</FieldType>
        <StyledInput type="password" name="password" onChange={handleChange} />
        <PasswordForgotten>Zapomniałeś hasła?</PasswordForgotten>
        <LoginButton onClick={handleSubmit}>LOGIN</LoginButton>
        <LoginButton facebook>LOGIN WITH FACEBOOK</LoginButton>
      </Container>
    </Wrapper>
  );
};

export default Login;
