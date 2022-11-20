import styled from "styled-components";
import SettingsTemplate from "templates/SettingsTemplate";
import { setInformationBlock } from "store/interface/actions";
import { information_types } from "constants/informations";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import LoadingIcon from "components/common/LoadingIcon";
import { useNavigate } from "react-router-dom";
import { routes } from "routes";
import { sendEmailChangingMessage } from "api/services/users.service";

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

const Information = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.darkGrey};
  padding-bottom: 10px;
  margin-bottom: 50px;
  text-align: justify;
  text-justify: inter-word;
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

const EmailChange = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object()
    .shape({
      password: Yup.string()
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
        ),
    })
    .required();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const emailChangingProcess: SubmitHandler<{ password: string }> = (data) => {
    setPending(true);

    sendEmailChangingMessage(data)
      .then((response) => {
        if (response.status === 200) {
          setPending(false);
          dispatch(
            setInformationBlock(information_types.update_email_message_sent)
          );
          navigate(routes.ACCOUNT_SETTINGS);
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
  } = useForm<{ password: string }>({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const password = validate("password");

  return (
    <SettingsTemplate>
      <Form onSubmit={handleSubmit(emailChangingProcess)}>
        <Header>Zmień adres e-mail</Header>
        <Information>
          W celu zmiany adresu e-mail, wyślemy na Twój bieżący adres link za
          pomocą, którego będziesz mógł dokonać zminy.
        </Information>
        <DataHolder>
          <Paragraph>Hasło</Paragraph>
          <StyledInput
            {...validate("password")}
            error={!!errors.password}
            autoComplete="off"
            maxLength={100}
            type="password"
            onChange={(e) => password.onChange(e)}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
          {error && (
            <Error>
              Nie udało się wysłać wiadomości. Upewnij się, że podałeś
              prawidłowe hasło lub spróbuj ponownie później.
            </Error>
          )}
          {pending ? (
            <LoadingIconHolder>
              <LoadingIcon />
            </LoadingIconHolder>
          ) : (
            <Button type="submit">Wyślij link do zmiany e-maila</Button>
          )}
        </DataHolder>
      </Form>
    </SettingsTemplate>
  );
};

export default EmailChange;
