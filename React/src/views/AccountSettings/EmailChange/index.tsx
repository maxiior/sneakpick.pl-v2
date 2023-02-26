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
import {
  Header,
  Form,
  Paragraph,
  StyledInput,
  Button,
  Information,
  Error,
  Holder,
} from "./styles";

const EmailChange = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

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
        <div>
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
            <Holder>
              <LoadingIcon />
            </Holder>
          ) : (
            <Button type="submit">Wyślij link do zmiany e-maila</Button>
          )}
        </div>
      </Form>
    </SettingsTemplate>
  );
};

export default EmailChange;
