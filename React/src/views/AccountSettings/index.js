import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DataBlock from "components/AccountSettings/DataBlock";
import http from "api/http";
import { endpoints } from "routes";
import useAuthenticated from "hooks/useAuthenticated";
import { routes } from "routes";

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

const Form = styled.form``;

const ProfileSettings = () => {
  const [data, setData] = useState({});

  useAuthenticated();

  useEffect(() => {
    http
      .get(endpoints.ME, {})
      .then((payload) => {
        setData(payload.data);
      })
      .catch(() => {});
  }, []);

  return (
    <Form>
      <Header>Ustawienia konta</Header>
      <DataHolder>
        <StyledDataBlock
          header="E-mail"
          value={data.email}
          to={routes.EMAIL_CHANGE}
        />
        <StyledDataBlock header="Numer telefonu" value="+485******07" />
        <StyledDataBlock
          header="Hasło"
          value="**********"
          to={routes.PASSWORD_CHANGE}
        />
        <StyledDataBlock header="Usuń konto" deleteAccount />
      </DataHolder>
    </Form>
  );
};

export default ProfileSettings;
