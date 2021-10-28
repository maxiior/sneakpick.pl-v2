import { useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import logo from "assets/logo_dark.png";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  closeLoginView,
  displayCommunicatorIcon,
} from "store/interface/actions";
import { login } from "store/auth/actions";
import { login as loginAction } from "store/auth/actions";
import { useDispatch } from "react-redux";
import { fetchFollowedItems } from "store/followed/actions";

const Wrapper = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-height: 445px) {
    padding: 30px 0;
    align-items: unset;
  }
`;

const Form = styled.form`
  background-color: ${({ theme }) => theme.white};
  padding: 50px 80px;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: ${({ theme }) => theme.borderRadius5};
  height: 100%;
`;

const StyledInput = styled.input`
  padding: 10px 12px;
  display: block;
  border: 1px solid ${({ error, theme }) => (error ? theme.red : theme.grey)};
  outline: none;
  width: 250px;

  :focus {
    border: 1px solid ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.blue};
  }
`;

const LoginButton = styled.button`
  background-color: ${({ facebook, theme }) =>
    facebook ? theme.blue : theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius5};
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
    color: ${({ theme }) => theme.blue};
  }
`;

const CLose = styled(IoMdClose)`
  right: 10px;
  top: 10px;
  cursor: pointer;
  position: absolute;
  color: ${({ theme }) => theme.veryDarkGrey};

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Error = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.red};
  margin-top: 3px;
  width: 250px;
  font-weight: 500;
`;

const Login = () => {
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

  const dispatch = useDispatch();

  const loginProcess = (data) => {
    dispatch(login(data))
      .then((response) => {
        if (response.payload.status === 200) {
          dispatch(displayCommunicatorIcon());
          dispatch(closeLoginView());
          dispatch(loginAction);
          dispatch(fetchFollowedItems());
        }
      })
      .catch((e) => {
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
        <CLose
          onClick={() => {
            dispatch(displayCommunicatorIcon());
            dispatch(closeLoginView());
          }}
        />
        <LogoHolder>
          <Logo src={logo} />
        </LogoHolder>
        <FieldType>Email</FieldType>
        <StyledInput
          name="email"
          type="text"
          error={errors.email || error}
          {...validate("email")}
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
          {...validate("password")}
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
