import styled from "styled-components";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { setNewPassword } from "api/services/users.service";
import { routes } from "routes";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import LoadingIcon from "components/common/LoadingIcon";
import { useAppDispatch } from "hooks/useAppDispatch";
import { setInformationBlock } from "store/interface/actions";
import { information_types } from "constants/informations";

const Wrapper = styled.div`
  padding: 70px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Header = styled.div`
  color: ${({ theme }) => theme.blue};
  font-size: 24px;
  margin-bottom: 15px;
`;

const Form = styled.form`
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  padding: 40px;
  min-width: 40%;
  max-width: 400px;
`;

const Text = styled.div`
  text-align: justify;
  text-justify: inter-word;
  font-size: 14px;
`;

const StyledInput = styled.input`
  padding: 10px 12px;
  display: block;
  border: 1px solid ${({ error, theme }) => (error ? theme.red : theme.grey)};
  outline: none;
  width: 100%;
  font-size: 14px;

  :focus {
    border: 1px solid ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.blue};
  }
`;

const Error = styled.div`
  background-color: ${({ theme }) => theme.red};
  padding: 5px;
  color: white;
  font-size: 12px;
  margin-top: 5px;
`;

const Paragraph = styled.div`
  font-size: 13px;
  padding-bottom: 2px;
  margin-top: 15px;
`;

const Button = styled.button`
  margin-top: 15px;
  user-select: none;
  cursor: pointer;
  border: 0;
  font-size: 14px;
  background-color: ${({ theme }) => theme.blue};
  padding: 10px 20px;
  color: ${({ theme }) => theme.white};
  border-radius: 5px;

  :hover {
    opacity: 0.8;
  }
`;

const Holder = styled.div`
  display: flex;
  justify-content: center;
`;

const NewPassword = () => {
  const { uid, token } = useParams();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
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

  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const dispatch = useAppDispatch();

  const settingNewPasswordProcess = (data) => {
    setPending(true);
    setNewPassword(data, uid, token)
      .then((response) => {
        if (response.status === 200) {
          setPending(false);
          history.push(routes.HOME);
          dispatch(setInformationBlock(information_types.password_reseted));
        }
      })
      .catch(() => {
        setError("Coś poszło nie tak. Spróbuj ponownie później.");
        setPending(false);
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

  const password = validate("password");

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(settingNewPasswordProcess)}>
        <Header>Resetowanie hasła</Header>
        <Text>Wprowadź poniżej nowe hasło do Twojego konta.</Text>
        <Paragraph>Nowe hasło</Paragraph>
        <StyledInput
          type="password"
          error={errors.password}
          {...validate("password")}
          onChange={(e) => {
            password.onChange(e);
          }}
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        <Paragraph>Powtórz hasło</Paragraph>
        <StyledInput
          name="repeated_password"
          type="password"
          error={errors.repeated_password}
          {...validate("repeated_password")}
        />
        {errors.repeated_password && (
          <Error>{errors.repeated_password.message}</Error>
        )}
        {error && <Error>{error}</Error>}
        {pending ? (
          <Holder>
            <LoadingIcon />
          </Holder>
        ) : (
          <Button type="submit">Zatwierdź</Button>
        )}
      </Form>
    </Wrapper>
  );
};

export default NewPassword;
