import React from "react";
import styled from "styled-components";
import Option from "./Option";
import { useFormContext } from "react-hook-form";

const Wrapper = styled.div`
  width: 70%;
`;

const Header = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const Error = styled.div`
  background-color: ${({ theme }) => theme.red};
  padding: 5px;
  color: white;
  font-size: 12px;
  margin-top: 5px;
`;

const Categories = () => {
  const { formState } = useFormContext();

  return (
    <Wrapper>
      <Header>Kategoria</Header>
      <div>
        <Option name="Promka" />
        <Option name="Drop" />
        <Option name="EA" />
        <Option name="Steal" />
      </div>
      {formState.errors["category"] && (
        <Error>{formState.errors["category"].message}</Error>
      )}
    </Wrapper>
  );
};

export default Categories;
