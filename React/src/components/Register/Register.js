import { useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import Checkbox from "components/Register/Checkbox";
import logo from "assets/logo_dark.png";
import { useForm, FormProvider } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  closeRegisterView,
  displayCommunicatorIcon,
} from "store/interface/actions";
import { register } from "api/services/auth.service";
import { useDispatch } from "react-redux";
import { setInformationBlock } from "store/interface/actions";
import { information_types } from "constants/informations";

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

  @media only screen and (max-height: 867px) {
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

const Button = styled.button`
  background-color: ${({ facebook, theme }) =>
    facebook ? theme.blue : theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  width: 100%;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  border-radius: ${({ theme }) => theme._10px};
  border: 0;
  display: block;
  font-size: 14px;

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

const Holder = styled.div`
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
  right: 15px;
  top: 15px;
  cursor: pointer;
  position: absolute;
  color: ${({ theme }) => theme.veryDarkGrey};

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const StyledCheckbox = styled(Checkbox)`
  margin: 15px 0;
`;

const Error = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.red};
  margin-top: ${({ statute }) => (statute ? "-10px" : "3px")};
  margin-bottom: ${({ statute }) => (statute ? "15px" : "0")};
  width: 250px;
  font-weight: 500;
`;

const Register = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("Pole jest wymagane.")
      .matches("^[aA-zZĄąĆćĘęŁłŃńÓóŚśŻżŹź]+$", "Podano nieprawidłowe imię."),
    last_name: Yup.string()
      .required("Pole jest wymagane.")
      .matches(
        "^[aA-zZĄąĆćĘęŁłŃńÓóŚśŻżŹź]+$",
        "Podano nieprawidłowe nazwisko."
      ),
    city: Yup.string()
      .required("Pole jest wymagane.")
      .matches("^[aA-zZĄąĆćĘęŁłŃńÓóŚśŻżŹź]+$", "Podano nieprawidłowe miasto."),
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
    statute: Yup.bool().oneOf([true], "Musisz zaakceptować regulamin strony."),
  });

  const [problems, setProblems] = useState({
    first_name: false,
    last_name: false,
    city: false,
    email: false,
    password: false,
  });

  const registerProcess = (data) => {
    register(data)
      .then((response) => {
        if (response.status === 201) {
          dispatch(closeRegisterView());
          dispatch(displayCommunicatorIcon());
          dispatch(setInformationBlock(information_types.account_created));
        }
      })
      .catch((error) => {
        const problemsObj = { ...problems };
        Object.keys(error.response.data).forEach((err) => {
          problemsObj[err] = true;
        });
        setProblems(problemsObj);
      });
  };

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const {
    register: validate,
    formState: { errors },
    handleSubmit,
  } = methods;

  const first_name = validate("first_name");
  const last_name = validate("last_name");
  const city = validate("city");
  const email = validate("email");
  const password = validate("password");

  const handleChange = (e) => {
    if (problems[e.target.name]) {
      setProblems({ ...problems, [e.target.name]: false });
    }
  };

  const [checkbox, setCheckbox] = useState(false);

  return (
    <Wrapper>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(registerProcess)}>
          <CLose
            onClick={() => {
              dispatch(closeRegisterView());
              dispatch(displayCommunicatorIcon());
            }}
          />
          <Holder>
            <Logo src={logo} />
          </Holder>
          <FieldType>Imię</FieldType>
          <StyledInput
            name="first_name"
            type="text"
            error={errors.first_name}
            {...validate("first_name")}
            onChange={(e) => {
              first_name.onChange(e);
              handleChange(e);
            }}
          />
          {errors.first_name && <Error>{errors.first_name.message}</Error>}
          {problems.first_name && <Error>Podano nieprawidłowe imię.</Error>}
          <FieldType>Nazwisko</FieldType>
          <StyledInput
            name="last_name"
            type="text"
            error={errors.last_name}
            {...validate("last_name")}
            onChange={(e) => {
              last_name.onChange(e);
              handleChange(e);
            }}
          />
          {errors.last_name && <Error>{errors.last_name.message}</Error>}
          {problems.last_name && <Error>Podano nieprawidłowe nazwisko.</Error>}
          <FieldType>Miasto</FieldType>
          <StyledInput
            name="city"
            type="text"
            error={errors.city}
            {...validate("city")}
            onChange={(e) => {
              city.onChange(e);
              handleChange(e);
            }}
          />
          {errors.city && <Error>{errors.city.message}</Error>}
          {problems.city && <Error>Podano nieprawidłowe miasto.</Error>}
          <FieldType>Email</FieldType>
          <StyledInput
            name="email"
            type="email"
            error={errors.email}
            {...validate("email")}
            onChange={(e) => {
              email.onChange(e);
              handleChange(e);
            }}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
          {problems.email && (
            <Error>Konto o podanym adresie email już istnieje.</Error>
          )}
          <FieldType>Hasło</FieldType>
          <StyledInput
            name="password"
            type="password"
            error={errors.password}
            {...validate("password")}
            onChange={(e) => {
              password.onChange(e);
              handleChange(e);
            }}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
          {problems.password && (
            <Error>
              Hasło musi zawierać małe i duże litery, cyfry oraz znaki
              specjalne.
            </Error>
          )}
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
            setCheckbox={setCheckbox}
            checkbox={checkbox}
            name="statute"
          />
          {errors.statute && <Error statute>{errors.statute.message}</Error>}
          <Button type="submit">SIGN UP</Button>
          <Button facebook>LOGIN WITH FACEBOOK</Button>
        </Form>
      </FormProvider>
    </Wrapper>
  );
};

export default Register;
