import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DataBlock from "components/ProfileSettings/DataBlock";
import axiosInstance from "axios/axios";
import { endpoints } from "routes";
import Description from "components/ProfileSettings/Description";

const Header = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const Add = styled.button`
  width: 60%;
  text-align: center;
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 50px;
  border: 0;

  :hover {
    opacity: 0.9;
  }
`;

const StyledDataBlock = styled(DataBlock)`
  margin-bottom: 20px;
`;

const DataHolder = styled.div`
  margin-top: 20px;
`;

const ProfileSettings = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axiosInstance
      .get(endpoints.ME, {})
      .then((payload) => {
        console.log(payload.data);
        setData(payload.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <Header>Szczegóły profilu</Header>
      <DataHolder>
        <StyledDataBlock header="Imię" value={data.first_name} />
        <StyledDataBlock header="Nazwisko" value={data.last_name} />
        <StyledDataBlock header="Miasto" value={data.city} />
        <Description />
      </DataHolder>
      <Add type="submit">Zaktualizuj profil</Add>
    </>
  );
};

export default ProfileSettings;
