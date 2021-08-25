import React from "react";
import styled from "styled-components";
import Header from "components/WTS/Header";
import Combobox from "components/WTS/Combobox";
import Autocomplete from "components/WTS/Autocomplete";
import { connect } from "react-redux";
import { changeState as changeStateAction } from "actions/WTS";

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
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Feature = ({
  name,
  placeholder,
  elements,
  combobox,
  autocomplete,
  number,
  filterType,
  changeState,
  value,
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
        <Container>
          <StyledInput
            type={number ? "number" : "text"}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              if (number) changeState(filterType, e.target.value, "number");
              else changeState(filterType, e.target.value, "text");
            }}
          />
        </Container>
      )}
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeState: (filterType, id, input) =>
    dispatch(changeStateAction(filterType, id, input)),
});

export default connect(null, mapDispatchToProps)(Feature);
