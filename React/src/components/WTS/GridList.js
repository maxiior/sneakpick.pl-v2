import React from "react";
import styled, { css } from "styled-components";
import Header from "components/WTS/Header";

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

  ${({ small }) =>
    small &&
    css`
      width: 60px;
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

const GridList = ({ name, elements, ...props }) => {
  return (
    <Wrapper>
      <Header>{name}</Header>
      <Container {...props}>
        {elements.map((e, i) => (
          <StyledLabel key={i}>
            <StyledInput type="radio" name={name} />
            <Option medium>{e.text}</Option>
          </StyledLabel>
        ))}
      </Container>
    </Wrapper>
  );
};

export default GridList;
