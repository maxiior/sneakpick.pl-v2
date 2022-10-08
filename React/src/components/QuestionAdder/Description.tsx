import React, { useState } from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";

const TextArea = styled.textarea<{ error: boolean }>`
  outline: none;
  width: 100%;
  height: 150px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid
    ${({ theme, error }) => (error ? theme.red : theme.grey)};
  padding: 5px 12px;
  resize: none;
  display: block;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.grey};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.blue};
  }

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.blue};
  }
`;

const Counter = styled.div`
  display: inline-block;
  font-size: 12px;
  margin-left: 15px;
  color: ${({ color }) => color};
`;

const Header = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 500;
  display: inline-block;
`;

const Error = styled.div`
  background-color: ${({ theme }) => theme.red};
  padding: 5px;
  color: white;
  font-size: 12px;
  margin-top: 5px;
`;

const Wrapper = styled.div`
  width: 70%;
  margin-top: 20px;
`;

const Description = ({ setDescription }: { setDescription: Function }) => {
  const [counter, setCounter] = useState(1000);
  const [color, setColor] = useState("black");

  const { register, formState } = useFormContext();
  const validator = register("description");

  const descriptionLength = (e: any) => {
    const value = 1000 - e.target.value.length;
    setCounter(value);
    if (value <= 50) setColor("red");
    else setColor("black");
  };

  return (
    <Wrapper>
      <Header>Opis</Header>
      <Counter color={color}>Pozostało {counter} znaków</Counter>
      <TextArea
        error={!!formState.errors["description"]}
        placeholder="Opis"
        {...register("description")}
        onChange={(e) => {
          validator.onChange(e);
          descriptionLength(e);
          setDescription(e.target.value);
        }}
        maxLength={1000}
      />
      {formState.errors["description"] && (
        <Error>{formState.errors["description"].message}</Error>
      )}
    </Wrapper>
  );
};

export default Description;
