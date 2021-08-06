import React, { useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import Checkbox from "components/Checkbox/Checkbox";
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
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  border: 0;
  display: block;

  :hover {
    opacity: 0.9;
  }

  :last-child {
    margin-top: 10px;
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

const StyledCheckbox = styled(Checkbox)`
  margin: 15px 0;
`;

const Error = styled.div`
  font-size: 11px;
  color: red;
  margin-top: 3px;
  width: 250px;
`;

const Register = ({ setRegisterView }) => {
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("Pole jest wymagane."),
    last_name: Yup.string().required("Pole jest wymagane."),
    city: Yup.string().required("Pole jest wymagane."),
    email: Yup.string()
      .required("Pole jest wymagane.")
      .email("Email jest nieprawidłowy."),
    password: Yup.string()
      .required("Pole jest wymagane.")
      .min(8, "Hasło musi mieć conajmniej 8 znaków.")
      .test(
        "passwordRequirements",
        "Hasło musi zawierać małe i duże litery, cyfry oraz znaki specjalne.",
        (value) => {
          return [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
            pattern.test(value)
          );
        }
      ),
    repeated_password: Yup.string()
      .required("Pole jest wymagane.")
      .oneOf([Yup.ref("password"), null], "Hasła muszą być takie same."),
  });

  const registerProcess = (data) => {
    axiosInstance
      .post("user/register/", {
        first_name: data.first_name,
        last_name: data.last_name,
        city: data.city,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        setRegisterView(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const {
    register: validate,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onSubmit", resolver: yupResolver(validationSchema) });

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(registerProcess)}>
        <CLose onClick={() => setRegisterView(false)} />
        <LogoHolder>
          <Logo src={logo} />
        </LogoHolder>
        <FieldType>Imię</FieldType>
        <StyledInput
          name="first_name"
          type="text"
          error={errors.first_name}
          {...validate("first_name")}
        />
        {errors.first_name && <Error>{errors.first_name.message}</Error>}
        <FieldType>Nazwisko</FieldType>
        <StyledInput
          name="last_name"
          type="text"
          error={errors.last_name}
          {...validate("last_name")}
        />
        {errors.last_name && <Error>{errors.last_name.message}</Error>}
        <FieldType>Miasto</FieldType>
        <StyledInput
          name="city"
          type="text"
          error={errors.city}
          {...validate("city")}
        />
        {errors.city && <Error>{errors.city.message}</Error>}
        <FieldType>Email</FieldType>
        <StyledInput
          name="email"
          type="email"
          error={errors.email}
          {...validate("email")}
        />
        {errors.email && <Error>{errors.email.message}</Error>}
        <FieldType>Hasło</FieldType>
        <StyledInput
          name="password"
          type="password"
          error={errors.password}
          {...validate("password")}
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        <FieldType>Powtórz hasło</FieldType>
        <StyledInput
          name="repeated_password"
          type="password"
          error={errors.repeated_password}
          {...validate("repeated_password")}
        />
        {errors.repeated_password && (
          <Error>{errors.repeated_password.message}</Error>
        )}
        <StyledCheckbox
          text="Akceptuje regulamin strony."
          setCheckbox={null}
          checkbox={null}
          small
        />
        <LoginButton type="submit">SIGN UP</LoginButton>
        <LoginButton facebook>LOGIN WITH FACEBOOK</LoginButton>
      </Form>
    </Wrapper>
  );
};

export default Register;
