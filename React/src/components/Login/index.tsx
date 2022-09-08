import styled from "styled-components";
import logo from "assets/logo.png";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  closeLoginView,
  displayCommunicatorIcon,
} from "store/interface/actions";
import { login } from "store/auth/actions";
import { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchFollowedItems } from "store/followed/actions";
import { iLogin } from "types/Login/login";
import { useAppDispatch } from "hooks/useAppDispatch";
import { Link } from "react-router-dom";
import { routes } from "routes";
import { useDetectOutsideClick } from "hooks/useDetectOutsideClick";

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

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Form = styled.form`
  background-color: ${({ theme }) => theme.white};
  padding: 50px 80px;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: ${({ theme }) => theme._10px};
  height: 100%;
`;

const Close = styled(IoMdClose)`
  right: 15px;
  top: 15px;
  cursor: pointer;
  position: absolute;
  color: ${({ theme }) => theme.veryDarkGrey};

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Holder = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Logo = styled.img`
  width: 121px;
  height: 44px;
`;

const Type = styled.div`
  font-size: 13px;
  padding-bottom: 2px;
  margin-top: 15px;
`;

const StyledInput = styled.input<{ error: boolean }>`
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

const PasswordForgotten = styled(Link)`
  font-size: 12px;
  padding-bottom: 2px;
  padding-top: 2px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.black};

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Button = styled.button<{ facebook?: boolean }>`
  background-color: ${({ facebook, theme }) =>
    facebook ? theme.blue : theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
  border-radius: ${({ theme }) => theme._10px};
  border: 0;
  display: block;
  font-size: ${({ theme }) => theme.font_size_MD};

  :hover {
    opacity: 0.9;
  }
`;

const Error = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.red};
  margin-top: 3px;
  width: 250px;
  font-weight: 500;
`;

const Login: React.FC = () => {
  const validationSchema = Yup.object()
    .shape({
      email: Yup.string()
        .required("Podaj adres email.")
        .email("Email jest nieprawidłowy."),
      password: Yup.string().required("Wpisz hasło."),
    })
    .required();

  const dispatch = useAppDispatch();
  const wrapperRef = useRef(null);
  const [error, setError] = useState("");
  useDetectOutsideClick(wrapperRef, () => dispatch(closeLoginView()));

  const loginProcess: SubmitHandler<iLogin> = (data) => {
    dispatch(login(data))
      .unwrap()
      .then((response: any) => {
        if (response.status === 200) {
          dispatch(displayCommunicatorIcon());
          dispatch(closeLoginView());
          dispatch(fetchFollowedItems());
        }
      })
      .catch((e) => {
        const status: number = e.status;
        switch (status) {
          case 400:
            setError(
              "To konto nie zostało jeszcze aktywowane. Sprawdź swojego maila."
            );
            break;
          case 403:
          case 404:
            setError("Wprowadzony adres email lub hasło są nieprawidłowe.");
            break;
        }
      });
  };

  const {
    register: validate,
    formState: { errors },
    handleSubmit,
  } = useForm<iLogin>({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const email = validate("email");
  const password = validate("password");

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(loginProcess)} ref={wrapperRef}>
        <Close onClick={() => dispatch(closeLoginView())} />
        <Holder>
          <Logo src={logo} />
        </Holder>
        <Type>Email</Type>
        <StyledInput
          type="text"
          error={!!errors.email || !!error}
          {...validate("email")}
          onChange={(e) => {
            email.onChange(e);
            setError("");
          }}
        />
        {errors.email && <Error>{errors.email.message}</Error>}
        <Type>Hasło</Type>
        <StyledInput
          type="password"
          error={!!errors.password || !!error}
          {...validate("password")}
          onChange={(e) => {
            password.onChange(e);
            setError("");
          }}
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        {error && <Error>{error}</Error>}
        <PasswordForgotten
          to={routes.PASSWORD_RESETTING}
          onClick={() => dispatch(closeLoginView())}
        >
          Zapomniałeś hasła?
        </PasswordForgotten>
        <Button type="submit">LOGIN</Button>
        <Button type="submit" facebook>
          LOGIN WITH FACEBOOK
        </Button>
      </Form>
    </Wrapper>
  );
};

export default Login;
