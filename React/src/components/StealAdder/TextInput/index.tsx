import React from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";

const Wrapper = styled.div`
  margin-top: 20px;
  width: 70%;
`;

const Header = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const StyledInput = styled.input<{ error?: boolean }>`
  border: 0;
  border-bottom: 1px solid
    ${({ theme, error }) => (error ? theme.red : theme.grey)};
  outline: none;
  padding: 5px 12px;
  width: 100%;
`;

const Error = styled.div`
  background-color: ${({ theme }) => theme.red};
  padding: 5px;
  color: white;
  font-size: 12px;
  margin-top: 5px;
  user-select: none;
`;

const Item = ({
  setValue,
  name,
  placeholder,
}: {
  setValue: Function;
  name: string;
  placeholder: string;
}) => {
  const { register, formState } = useFormContext();
  const validator = register(name);

  return (
    <Wrapper>
      <Header>Nagłówek</Header>
      <StyledInput
        autoComplete="off"
        type="text"
        error={formState.errors[name]}
        maxLength={100}
        {...register(name)}
        onChange={(e) => {
          validator.onChange(e);
          setValue(e.target.value);
        }}
        placeholder={placeholder}
      />
      {formState.errors[name] && (
        <Error>{formState.errors[name].message}</Error>
      )}
    </Wrapper>
  );
};

export default Item;
