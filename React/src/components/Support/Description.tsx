import React from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";

const Wrapper = styled.textarea<{ error: Boolean }>`
  padding: 10px 12px;
  display: block;
  border: none;
  border-bottom: 1px solid
    ${({ theme, error }) => (error ? theme.red : theme.grey)};
  outline: none;
  width: 100%;
  resize: none;
  height: 200px;

  ::-webkit-scrollbar {
    cursor: default;
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.grey};
    cursor: default;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.blue};
    cursor: default;
  }

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.blue};
  }
`;

const Description = () => {
  const { register, formState } = useFormContext();
  const validator = register("description");

  return (
    <Wrapper
      {...register("description")}
      onChange={(el) => {
        validator.onChange(el);
      }}
      placeholder="Napisz wiadomość"
      error={formState.errors.description}
    />
  );
};

export default Description;
