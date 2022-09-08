import styled from "styled-components";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { sendPasswordResettingMessage } from "api/services/users.service";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
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

const Paragraph = styled.div`
  font-size: 13px;
  padding-bottom: 2px;
  margin-top: 15px;
`;

const StyledInput = styled.input<{ error?: boolean }>`
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
  font-size: 11px;
  color: ${({ theme }) => theme.red};
  margin-top: 3px;
  width: 250px;
  font-weight: 500;
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

const PasswordResetting: React.FC = () => {
  const validationSchema = Yup.object()
    .shape({
      email: Yup.string()
        .required("Podaj adres email.")
        .email("Email jest nieprawidłowy."),
    })
    .required();

  const history = useHistory();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const dispatch = useAppDispatch();

  const sendingProcess: SubmitHandler<{ email: string }> = (data) => {
    setPending(true);
    sendPasswordResettingMessage(data)
      .then((response: any) => {
        if (response.status === 200) {
          history.push(routes.WTB + routes.DEFAULT_SEARCH);
          setPending(false);
          dispatch(
            setInformationBlock(
              information_types.resetting_password_message_sent
            )
          );
        }
      })
      .catch(() => {
        setError("Coś poszło nie tak. Spróbuj ponownie później.");
        setPending(false);
      });
  };

  const {
    register: validate,
    formState: { errors },
    handleSubmit,
  } = useForm<{ email: string }>({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const email = validate("email");

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(sendingProcess)}>
        <Header>Resetowanie hasła</Header>
        <Text>
          Wprowadź poniżej adres e-mail, do którego przypisane jest Twoje konto
          Sneakpick, abyśmy mogli wysłać Ci link do zresetowania hasła.
        </Text>
        <Paragraph>E-mail</Paragraph>
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
        {error && <Error>{error}</Error>}
        {pending ? (
          <Holder>
            <LoadingIcon />
          </Holder>
        ) : (
          <Button type="submit">Wyślij</Button>
        )}
      </Form>
    </Wrapper>
  );
};

export default PasswordResetting;
