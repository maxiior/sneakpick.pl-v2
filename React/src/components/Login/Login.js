import React, { useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import logo from "assets/logo_dark.png";
import axiosInstance from "axios/axios";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

const Form = styled.form`
  background-color: white;
  padding: 50px 80px;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
`;

const StyledInput = styled.input`
  padding: 10px 12px;
  display: block;
  border: 1px solid ${({ error }) => (error ? "red" : "#d6d6d6")};
  outline: none;
  width: 250px;

  :focus {
    border: 1px solid #00b4ff;
    color: #00b4ff;
  }
`;

const LoginButton = styled.button`
  background-color: ${({ facebook }) => (facebook ? "#4c69ba" : "#191919")};
  color: white;
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  border: 0;
  display: block;

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
  font-size: 13px;
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

const Error = styled.div`
  font-size: 11px;
  color: red;
  margin-top: 3px;
  width: 250px;
`;

const Login = ({ setLoginView }) => {
  const [error, setError] = useState(false);
  const handleChange = () => {
    if (error) setError(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Podaj adres email.")
      .email("Email jest nieprawidłowy."),
    password: Yup.string().required("Wpisz hasło."),
  });

  const loginProcess = (data) => {
    axiosInstance
      .post("token/", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        setLoginView(false);
      })
      .catch((error) => {
        setError(true);
      });
  };

  const {
    register: validate,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onSubmit", resolver: yupResolver(validationSchema) });

  const email = validate("email");
  const password = validate("password");

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(loginProcess)}>
        <CLose onClick={() => setLoginView(false)} />
        <LogoHolder>
          <Logo src={logo} />
        </LogoHolder>
        <FieldType>Email</FieldType>
        <StyledInput
          name="email"
          type="text"
          error={errors.email || error}
          onChange={(e) => {
            email.onChange(e);
            handleChange(e);
          }}
        />
        {errors.email && <Error>{errors.email.message}</Error>}
        <FieldType>Hasło</FieldType>
        <StyledInput
          name="password"
          type="password"
          error={errors.password || error}
          onChange={(e) => {
            password.onChange(e);
            handleChange(e);
          }}
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        {error && (
          <Error>Wprowadzony adres email lub hasło są nieprawidłowe.</Error>
        )}
        <PasswordForgotten>Zapomniałeś hasła?</PasswordForgotten>
        <LoginButton type="submit">LOGIN</LoginButton>
        <LoginButton type="submit" facebook>
          LOGIN WITH FACEBOOK
        </LoginButton>
      </Form>
    </Wrapper>
  );
};

export default Login;
