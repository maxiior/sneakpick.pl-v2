import styled from "styled-components";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { setNewPassword } from "api/services/users.service";
import { routes } from "routes";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import LoadingIcon from "components/common/LoadingIcon";
import { useAppDispatch } from "hooks/useAppDispatch";
import { setInformationBlock } from "store/interface/actions";
import { information_types } from "constants/informations";
import { iNewEmail } from "types/NewEmail/newEmail";
import { setNewEmail } from "api/services/users.service";

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

const StyledInput = styled.input<{ error: boolean }>`
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
  width: 100%;
  cursor: pointer;
  border: 0;
  font-size: 16px;
  background-color: ${({ theme }) => theme.blue};
  padding: 12px;
  color: ${({ theme }) => theme.white};
  border-radius: 10px;

  :hover {
    opacity: 0.8;
  }
`;

const Holder = styled.div`
  display: flex;
  justify-content: center;
`;

const NewEmailSetter = () => {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const dispatch = useAppDispatch();
  const { uidb64, token }: { uidb64: string; token: string } = useParams();
  const history = useHistory();

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
      newEmail: Yup.string()
        .required("Pole jest wymagane.")
        .email("Email jest nieprawidłowy."),
      repeatedEmail: Yup.string()
        .required("Pole jest wymagane.")
        .email("Email jest nieprawidłowy.")
        .oneOf([Yup.ref("newEmail"), null], "Adresy muszą być takie same."),
    })
    .required();

  const changingEmailProcess: SubmitHandler<iNewEmail> = (data) => {
    setPending(true);

    setNewEmail(data, token, uidb64)
      .then((response) => {
        if (response.status === 200) {
          setPending(false);
          history.push(routes.HOME);
          dispatch(setInformationBlock(information_types.new_email_set));
        }
      })
      .catch((e) => {
        setPending(false);
        switch (e.response.status) {
          case 403:
            setError(
              "Nie udało się zmienić maila. Adres e-mail, który podałeś/aś jest taki sam jak aktualny adres Twojego konta."
            );
            break;
          case 401:
            setError(
              "Nie udało się zmienić maila. Upewnij się, że podałeś/aś prawidłowe hasło."
            );
            break;
          default:
            setError(
              "Nie udało się zmienić maila. Możliwe że link, z którego korzystasz został już wcześniej użyty lub stracił ważność."
            );
        }
      });
  };

  const {
    register: validate,
    formState: { errors },
    handleSubmit,
  } = useForm<iNewEmail>({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const password = validate("password");
  const newEmail = validate("newEmail");
  const repeatedEmail = validate("repeatedEmail");

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(changingEmailProcess)}>
        <Header>Zmiana adresu e-mail</Header>
        <Text>Wprowadź poniżej nowy adres e-mail do Twojego konta.</Text>
        <Paragraph>Hasło</Paragraph>
        <StyledInput
          type="password"
          error={!!errors.password}
          {...validate("password")}
          onChange={(e) => {
            password.onChange(e);
            setError("");
          }}
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        <Paragraph>Nowy adres e-mail</Paragraph>
        <StyledInput
          type="email"
          error={!!errors.newEmail}
          {...validate("newEmail")}
          onChange={(e) => {
            newEmail.onChange(e);
            setError("");
          }}
        />
        {errors.newEmail && <Error>{errors.newEmail.message}</Error>}
        <Paragraph>Powtórz adres e-mail</Paragraph>
        <StyledInput
          type="email"
          error={!!errors.repeatedEmail}
          {...validate("repeatedEmail")}
          onChange={(e) => {
            repeatedEmail.onChange(e);
            setError("");
          }}
        />
        {errors.repeatedEmail && <Error>{errors.repeatedEmail.message}</Error>}
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

export default NewEmailSetter;
