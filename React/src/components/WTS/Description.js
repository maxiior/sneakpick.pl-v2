import React, { useState } from "react";
import styled from "styled-components";
import Header from "components/WTS/Header";
import { connect } from "react-redux";
import { changeState as changeStateAction } from "actions/WTS";
import { useFormContext } from "react-hook-form";
import { Error } from "components/WTS/Error";

const TextArea = styled.textarea`
  outline: none;
  width: 70%;
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

const StyledHeader = styled(Header)`
  display: inline-block;
`;

const Wrapper = styled.div``;

const Description = ({ name, placeholder, filterType, changeState, error }) => {
  const [counter, setCounter] = useState(1000);
  const [color, setColor] = useState("black");

  const descriptionLength = (e) => {
    const value = 1000 - e.target.value.length;
    setCounter(value);
    if (value <= 50) setColor("red");
    else setColor("black");
  };

  const { register, formState } = useFormContext();
  const validator = register("description");

  return (
    <Wrapper>
      <StyledHeader>{name}</StyledHeader>
      <Counter color={color}>Pozostało {counter} znaków</Counter>
      <TextArea
        name="description"
        placeholder={placeholder}
        onChange={(e) => {
          validator.onChange(e);
          descriptionLength(e);
          changeState(filterType, e.target.value, "text");
        }}
        maxLength="1000"
        error={formState.errors.description}
      />
      {formState.errors.description && (
        <Error>{formState.errors.description.message}</Error>
      )}
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeState: (filterType, id, input) =>
    dispatch(changeStateAction(filterType, id, input)),
});

export default connect(null, mapDispatchToProps)(Description);
