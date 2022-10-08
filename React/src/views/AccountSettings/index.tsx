import styled from "styled-components";
import DataBlock from "components/AccountSettings/DataBlock";
import useAuthenticated from "hooks/useAuthenticated";
import { routes } from "routes";
import SettingsTemplate from "templates/SettingsTemplate";
import { useAppSelector } from "hooks/useAppSelector";

const Header = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const DataHolder = styled.div`
  margin-top: 20px;
`;

const StyledDataBlock = styled(DataBlock)`
  margin-bottom: 20px;
`;

const ProfileSettings = () => {
  useAuthenticated();
  const { email } = useAppSelector((state) => state.authSlice);

  return (
    <SettingsTemplate>
      <Header>Ustawienia konta</Header>
      <DataHolder>
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
      </DataHolder>
    </SettingsTemplate>
  );
};

export default ProfileSettings;
