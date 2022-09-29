import styled from "styled-components";
import SettingsTemplate from "templates/SettingsTemplate";
import { setInformationBlock } from "store/interface/actions";
import { information_types } from "constants/informations";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { iPasswordChange } from "types/AccountSettings/passwordChange";
import { passwordUpdate } from "api/services/profile.service";
import LoadingIcon from "components/common/LoadingIcon";
import { useHistory } from "react-router-dom";
import { routes } from "routes";

const Header = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const DataHolder = styled.div``;

const Form = styled.form`
  max-width: 450px;
`;

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.font_size_MD};
  margin: 20px 0 5px 0;
  color: ${({ theme }) => theme.darkGrey};

  :first-child {
    margin-top: 0px;
  }
`;

const StyledInput = styled.input<{ error: boolean }>`
  outline: none;
  width: 100%;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid
    ${({ theme, error }) => (error ? theme.red : theme.grey)};
  padding: 5px;
  color: ${({ theme }) => theme.darkGrey};
  :focus {
    color: ${({ theme }) => theme.blue};
    border-bottom: 1px solid ${({ theme }) => theme.blue};
  }
`;

const Button = styled.button`
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.white};
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 50px;
  border: 0;
  :hover {
    opacity: 0.9;
  }
`;

const Error = styled.div`
  background-color: ${({ theme }) => theme.red};
  padding: 5px;
  color: white;
  font-size: 12px;
  margin-top: 5px;
`;

const LoadingIconHolder = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Information = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.darkGrey};
  padding-bottom: 10px;
  margin-bottom: 50px;
  text-align: justify;
  text-justify: inter-word;
`;

const PasswordChange = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const validationSchema = Yup.object()
    .shape({
      current_password: Yup.string().required("Pole jest wymagane."),
      new_password: Yup.string()
        .required("Pole jest wymagane.")
        .min(8, "Hasło musi mieć conajmniej 8 znaków.")
        .test(
          "passwordRequirements",
          "Hasło musi zawierać małe i duże litery, cyfry oraz znaki specjalne.",
          (value: any) => {
            return [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every(
              (pattern) => pattern.test(value)
            );
          }
        )
        .notOneOf(
          [Yup.ref("current_password"), null],
          "Nowe hasło musi się różnić od poprzedniego."
        ),
      repeated_password: Yup.string()
        .required("Pole jest wymagane.")
        .oneOf([Yup.ref("new_password"), null], "Hasła muszą być takie same."),
    })
    .required();

  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const passwordChangingProcess: SubmitHandler<iPasswordChange> = (data) => {
    setPending(true);

    passwordUpdate(data)
      .then((response) => {
        if (response.status === 200) {
          setPending(false);
          dispatch(setInformationBlock(information_types.password_changed));
          history.push(routes.ACCOUNT_SETTINGS);
        }
      })
      .catch(() => {
        setPending(false);
        setError(true);
      });
  };

  const {
    register: validate,
    formState: { errors },
    handleSubmit,
  } = useForm<iPasswordChange>({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const current_password = validate("current_password");
  const new_password = validate("new_password");
  const repeated_password = validate("repeated_password");

  return (
    <SettingsTemplate>
      <Form onSubmit={handleSubmit(passwordChangingProcess)}>
        <Header>Zmień hasło</Header>
        <Information>
          Nowe hasło powinno składać się z co najmniej 8 znaków. Powinno
          zawierać małe i duże litery, cyfry oraz znaki specjalne.
        </Information>
        <DataHolder>
          <Paragraph>Aktualne hasło</Paragraph>
          <StyledInput
            {...validate("current_password")}
            autoComplete="off"
            maxLength={100}
            type="password"
            error={!!errors.current_password}
            onChange={(e) => current_password.onChange(e)}
          />
          {errors.current_password && (
            <Error>{errors.current_password.message}</Error>
          )}
          <Paragraph>Nowe hasło</Paragraph>
          <StyledInput
            {...validate("new_password")}
            autoComplete="off"
            maxLength={100}
            type="password"
            error={!!errors.new_password}
            onChange={(e) => new_password.onChange(e)}
          />
          {errors.new_password && <Error>{errors.new_password.message}</Error>}
          <Paragraph>Powtórz hasło</Paragraph>
          <StyledInput
            {...validate("repeated_password")}
            autoComplete="off"
            maxLength={100}
            type="password"
            error={!!errors.repeated_password}
            onChange={(e) => repeated_password.onChange(e)}
          />
          {errors.repeated_password && (
            <Error>{errors.repeated_password.message}</Error>
          )}
          {error && (
            <Error>
              Nie udało się zmienić hasła. Upewnij się, że podałeś prawidłowe
              aktualne hasło lub spróbuj ponownie później.
            </Error>
          )}
          {pending ? (
            <LoadingIconHolder>
              <LoadingIcon />
            </LoadingIconHolder>
          ) : (
            <Button type="submit">Zmień hasło</Button>
          )}
        </DataHolder>
      </Form>
    </SettingsTemplate>
  );
};

export default PasswordChange;
