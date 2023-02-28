import useAuthenticated from "hooks/useAuthenticated";
import { routes } from "routes";
import SettingsTemplate from "templates/SettingsTemplate";
import { useAppSelector } from "hooks/useAppSelector";
import { Header, Container, StyledDataBlock } from "./styles";

const ProfileSettings = () => {
  useAuthenticated();
  const { email } = useAppSelector((state) => state.authSlice);

  return (
    <SettingsTemplate>
      <Header>Ustawienia konta</Header>
      <Container>
        <StyledDataBlock
          header="E-mail"
          value={email}
          to={routes.EMAIL_CHANGE}
        />
        <StyledDataBlock header="Numer telefonu" value="+485******07" to="" />
        <StyledDataBlock
          header="Hasło"
          value="**********"
          to={routes.PASSWORD_CHANGE}
        />
        <StyledDataBlock header="Usuń konto" deleteAccount to="" />
      </Container>
    </SettingsTemplate>
  );
};

export default ProfileSettings;
