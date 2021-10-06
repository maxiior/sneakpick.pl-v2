import React, { useState } from "react";
import styled from "styled-components";
import Header from "components/WTS/Header";
import Combobox from "components/WTS/Combobox";
import Autocomplete from "components/WTS/Autocomplete";
import { useDispatch } from "react-redux";
import { changeState } from "store/creator/actions";
import { useFormContext } from "react-hook-form";
import { Error } from "components/WTS/Error";

const StyledInput = styled.input`
  outline: none;
  width: 100%;
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

const Holder = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  position: relative;
`;

const PLN = styled.span`
  position: absolute;
  right: 12px;
  color: ${({ theme }) => theme.blue};
  pointer-events: none;
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
  error,
  ...props
}) => {
  const { register, formState } = useFormContext();
  const validator = register(name);
  const [value, setValue] = useState();
  const dispatch = useDispatch();

  const transformPrice = (e) => {
    if (e.target.value.includes(".")) {
      var numbers = e.target.value.split(".");
      e.target.value =
        numbers[0].substring(0, 6) + "." + numbers[1].substring(0, 2);
    } else if (e.target.value === "") {
    } else {
      e.target.value = e.target.value.substring(0, 6) + ".00";
    }
  };
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
            <Holder>
              <StyledInput
                autoComplete="off"
                type={number ? "number" : "text"}
                maxLength={100}
                step={number && "0.01"}
                error={formState.errors[name]}
                name={name}
                placeholder={placeholder}
                {...register(name)}
                onBlur={(e) => {
                  number && transformPrice(e);
                  dispatch(
                    changeState({
                      type: filterType,
                      id: e.target.value,
                      input: "number",
                    })
                  );
                }}
                onChange={(e) => {
                  validator.onChange(e);
                  if (number) {
                    dispatch(
                      changeState({
                        type: filterType,
                        id: e.target.value,
                        input: "number",
                      })
                    );
                    setValue(e.target.value);
                  } else
                    dispatch(
                      changeState({
                        type: filterType,
                        id: e.target.value,
                        input: "text",
                      })
                    );
                }}
              />
              {number && value && <PLN>PLN</PLN>}
            </Holder>
          </Container>
          {formState.errors[name] && (
            <Error>{formState.errors[name].message}</Error>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Feature;
