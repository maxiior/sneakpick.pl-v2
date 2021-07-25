import React from "react";
import styled from "styled-components";

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: ${({ theme }) => theme.grey};
  display: flex;
  justify-content: center;
  border-radius: 4px;

  transition: background-color 0.25s;

  ::after {
    width: 8px;
    height: 15px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    top: 3px;

    content: "";
    position: absolute;
    display: none;
  }
`;

const StyledInput = styled.input`
  display: none;
  cursor: pointer;

  :checked ~ ${Checkmark} {
    background-color: ${({ theme }) => theme.blue};
  }
  :checked ~ ${Checkmark}:after {
    display: block;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 25px;
`;

const Wrapper = styled.div``;

const Checkbox = ({ text, className, setCheckbox, checkbox }) => {
  return (
    <Wrapper className={className}>
      <StyledLabel>
        <div>{text}</div>
        <StyledInput
          type="checkbox"
          onChange={() => setCheckbox && setCheckbox(!checkbox)}
        />
        <Checkmark />
      </StyledLabel>
    </Wrapper>
  );
};

export default Checkbox;
