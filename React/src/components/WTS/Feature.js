import React from "react";
import styled from "styled-components";
import Header from "components/WTS/Header";
import Combobox from "components/WTS/Combobox";
import Autocomplete from "components/WTS/Autocomplete";
import { connect } from "react-redux";
import { changeState as changeStateAction } from "actions/WTS";
import { useFormContext } from "react-hook-form";
import { Error } from "components/WTS/Error";

const StyledInput = styled.input`
  outline: none;
  width: 70%;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid
    ${({ theme, error }) => (error ? theme.red : theme.grey)};
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
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Feature = ({
  title,
  name,
  placeholder,
  elements,
  combobox,
  autocomplete,
  number,
  filterType,
  changeState,
  error,
  ...props
}) => {
  const { register, formState } = useFormContext();
  const validator = register(name);
  return (
    <Wrapper>
      <Header {...props}>{title}</Header>
      {combobox ? (
        <>
          <Combobox elements={elements} filterType={filterType} />
          {formState.errors.category && (
            <Error>{formState.errors.category.message}</Error>
          )}
        </>
      ) : autocomplete ? (
        <>
          <Autocomplete
            elements={elements}
            filterType={filterType}
            placeholder={placeholder}
          />
          {formState.errors.brand && (
            <Error>{formState.errors.brand.message}</Error>
          )}
        </>
      ) : (
        <>
          <Container>
            <StyledInput
              type={number ? "number" : "text"}
              error={formState.errors[name]}
              name={name}
              placeholder={placeholder}
              onChange={(e) => {
                validator.onChange(e);
                if (number) changeState(filterType, e.target.value, "number");
                else changeState(filterType, e.target.value, "text");
              }}
            />
          </Container>
          {formState.errors[name] && (
            <Error>{formState.errors[name].message}</Error>
          )}
        </>
      )}
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeState: (filterType, id, input) =>
    dispatch(changeStateAction(filterType, id, input)),
});

export default connect(null, mapDispatchToProps)(Feature);
