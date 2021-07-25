import React from "react";
import styled, { css } from "styled-components";

const StyledElement = styled.div`
  margin: 2px 0;
  display: block;
  font-size: 14px;
`;

const Checkbox = styled.div`
  margin-right: 5px;
  width: 15px;
  height: 15px;
  border: 1px solid #f0f0f0;
`;

const Type = styled.div`
  padding: 5px 0;

  ${({ other }) =>
    other &&
    css`
      color: #00b4ff;
      font-weight: 600;
      margin: 2px 0;
    `}
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const StyledInput = styled.input`
  opacity: 0;
  position: absolute;

  :checked + ${Checkbox} {
    background-color: #00b4ff;
    box-shadow: inset 0 0 0 2px white;
  }
`;

const Element = ({ text, setChecked, elements, checked, onToggle }) => {
  return (
    <StyledElement>
      <StyledLabel>
        <StyledInput
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(setChecked, elements, text)}
        />
        <Checkbox />
        <Type other={text === "Inne"}>{text}</Type>
      </StyledLabel>
    </StyledElement>
  );
};

export default Element;