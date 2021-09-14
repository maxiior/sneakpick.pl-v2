import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DataBlock from "components/AccountSettings/DataBlock";
import axiosInstance from "axios/axios";
import { endpoints } from "routes";

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

  useEffect(() => {
    axiosInstance
      .get(endpoints.ME, {})
      .then((payload) => {
        setData(payload.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <Form>
      <Header>Ustawienia konta</Header>
      <DataHolder>
        <StyledDataBlock header="E-mail" value={data.email} />
        <StyledDataBlock header="Numer telefonu" value="+485******07" />
        <StyledDataBlock header="Hasło" value="**********" />
        <StyledDataBlock header="Usuń konto" deleteAccount />
      </DataHolder>
    </Form>
  );
};

export default ProfileSettings;
