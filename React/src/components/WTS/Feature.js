import React from "react";
import styled from "styled-components";
import Header from "components/WTS/Header";
import Combobox from "components/WTS/Combobox";
import Autocomplete from "components/WTS/Autocomplete";

const StyledInput = styled.input`
  outline: none;
  width: 70%;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  padding: 5px 12px;
  color: ${({ theme }) => theme.darkGrey};

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.blue};
  }
`;

const Wrapper = styled.div`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Feature = ({
  name,
  placeholder,
  defaultValue,
  elements,
  combobox,
  autocomplete,
  number,
  filterType,
  ...props
}) => {
  return (
    <Wrapper>
      <Header {...props}>{name}</Header>
      {combobox ? (
        <Combobox elements={elements} filterType={filterType} />
      ) : autocomplete ? (
        <Autocomplete
          elements={elements}
          filterType={filterType}
          placeholder={placeholder}
        />
      ) : (
        <StyledInput
          type={number ? "number" : "text"}
          placeholder={placeholder}
          value={defaultValue}
        />
      )}
    </Wrapper>
  );
};

export default Feature;
