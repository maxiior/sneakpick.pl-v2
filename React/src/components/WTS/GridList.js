import React from "react";
import styled, { css } from "styled-components";
import Header from "components/WTS/Header";
import { connect } from "react-redux";
import { changeState as changeStateAction } from "actions/WTS";
import { useFormContext } from "react-hook-form";
import { Error } from "components/WTS/Error";

const Option = styled.span`
  display: flex;
  border: 1px solid ${({ theme }) => theme.grey};
  height: 30px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.grey};
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  text-transform: uppercase;

  ${({ small }) =>
    small &&
    css`
      width: 71.25px;
    `}
  ${({ medium }) =>
    medium &&
    css`
      width: 1fr;
    `}
`;

const StyledLabel = styled.label`
  cursor: pointer;
`;

const StyledInput = styled.input`
  display: none;

  :checked ~ ${Option} {
    border-color: ${({ theme }) => theme.veryDarkGrey};
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.veryDarkGrey};
  }
`;

const Container = styled.div`
  width: 300px;
  display: grid;
  grid-gap: 5px;

  ${({ small }) =>
    small &&
    css`
      grid-template-columns: auto auto auto auto;
    `}
  ${({ medium }) =>
    medium &&
    css`
      grid-template-columns: auto auto;
    `}
`;

const Wrapper = styled.div``;

const GridList = ({
  name,
  elements,
  changeState,
  filterType,
  currentFilter,
  title,
  ...props
}) => {
  const { register, formState } = useFormContext();
  const validator = register(name);

  return (
    <Wrapper>
      <Header>
        {title}
        {formState.errors[name] && (
          <Error grid>{formState.errors[name].message}</Error>
        )}
      </Header>
      <Container {...props}>
        {elements.map((e, i) => (
          <StyledLabel key={i}>
            <StyledInput
              type="radio"
              name={name}
              onChange={(el) => {
                validator.onChange(el);
                changeState(filterType, e.text, "radio");
              }}
              checked={currentFilter && currentFilter === e.text}
            />
            <Option {...props}>{e.text}</Option>
          </StyledLabel>
        ))}
      </Container>
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeState: (filterType, id, input) =>
    dispatch(changeStateAction(filterType, id, input)),
});

export default connect(null, mapDispatchToProps)(GridList);
