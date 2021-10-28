import React, { useState } from "react";
import styled from "styled-components";
import Combobox from "components/Support/Combobox";
import { support_subjects } from "constants/supportSubjects";
import { useForm, FormProvider } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Description from "components/Support/Description";

const Form = styled.form`
  width: 50%;
`;

const Header = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

const Paragraph = styled.div`
  font-size: 13px;
  padding-bottom: 2px;
  margin-top: 15px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.white};
  font-size: 18px;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-weight: 500;
  margin-top: 10px;
  border: 0;

  :hover {
    opacity: 0.9;
  }
`;

const Contact: React.FC = () => {
  const [current, setCurrent] = useState("placeholder");

  const validationSchema = Yup.object().shape({
    subject: Yup.string().nullable().required("Pole jest wymagane."),
    description: Yup.string().required("Pole jest wymagane."),
  });

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const sendingProcess = () => {};

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(sendingProcess)}>
        <Header>Skontaktuj się z nami</Header>
        <Paragraph>Temat</Paragraph>
        <Combobox
          elements={support_subjects}
          current={current}
          setCurrent={setCurrent}
        />
        <Paragraph>Wiadomość</Paragraph>
        <Description />
        <Button type="submit">Wyślij</Button>
      </Form>
    </FormProvider>
  );
};

export default Contact;
