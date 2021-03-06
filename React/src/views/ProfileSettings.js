import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DataBlock from "components/ProfileSettings/DataBlock";
import http from "api/http";
import { endpoints } from "routes";
import Description from "components/ProfileSettings/Description";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import Avatar from "components/ProfileSettings/Avatar";
import useAuthenticated from "hooks/useAuthenticated";
import { useSelector } from "react-redux";

const Header = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const Add = styled.button`
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.white};
  padding: 15px;
  border-radius: ${({ theme }) => theme._5px};
  cursor: pointer;
  margin-top: 50px;
  border: 0;

  :hover {
    opacity: 0.9;
  }
`;

const StyledDataBlock = styled(DataBlock)`
  margin-bottom: 20px;

  :last-child {
    margin-bottom: 0;
  }
`;

const DataHolder = styled.div`
  margin-top: 20px;
`;

const Form = styled.form``;

const ProfileSettings = () => {
  const [data, setData] = useState({});

  useAuthenticated();
  const isAuthenticated = useSelector(
    (state) => state.authSlice.isAuthenticated
  );

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("Pole jest wymagane.")
      .matches("[A-Za-z]", "Podano nieprawidłowe imię."),
    last_name: Yup.string()
      .required("Pole jest wymagane.")
      .matches("[A-Za-z]", "Podano nieprawidłowe nazwisko."),
    city: Yup.string()
      .required("Pole jest wymagane.")
      .matches("[A-Za-z]", "Podano nieprawidłowe miasto."),
    description: Yup.string(),
  });

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const updatingProcess = (data) => {
    http
      .put(endpoints.EDIT, {
        first_name: data.first_name,
        last_name: data.last_name,
        city: data.city,
        description: data.description,
      })
      .then((response) => {
        if (response.status === 201) {
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (isAuthenticated) {
      http
        .get(endpoints.ME, {})
        .then((payload) => {
          setData(payload.data);
        })
        .catch(() => {});
    }
  }, [isAuthenticated]);

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(updatingProcess)}>
        <Header>Szczegóły profilu</Header>
        <DataHolder>
          <Avatar />
          <StyledDataBlock
            name="first_name"
            header="Imię"
            value={data.first_name}
            placeholder="np. Jan"
            setData={setData}
            data={data}
          />
          <StyledDataBlock
            name="last_name"
            header="Nazwisko"
            value={data.last_name}
            placeholder="np. Kowalski"
            setData={setData}
            data={data}
          />
          <StyledDataBlock
            name="city"
            header="Miasto"
            value={data.city}
            placeholder="np. Warszawa"
            setData={setData}
            data={data}
          />
          <Description value={data.description} setData={setData} />
        </DataHolder>
        <Add type="submit">Zaktualizuj profil</Add>
      </Form>
    </FormProvider>
  );
};

export default ProfileSettings;
