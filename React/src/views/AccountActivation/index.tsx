import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { activation } from "api/services/users.service";
import { Wrapper, Container } from "./styles";
import Logo from "components/AccountActivation/Logo";
import LoadingIconPanel from "components/AccountActivation/LoadingIconPanel";
import Informations from "components/AccountActivation/Informations";

const AccountActivation = () => {
  const { uidb64, token } = useParams<{ uidb64: string; token: string }>();
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    activation(uidb64!, token!)
      .then(() => {
        setPending(false);
      })
      .catch(() => {
        setPending(false);
        setError(true);
      });
  }, []);

  return (
    <Wrapper>
      <Container>
        <Logo />
        {pending ? <LoadingIconPanel /> : <Informations error={error} />}
      </Container>
    </Wrapper>
  );
};

export default AccountActivation;
