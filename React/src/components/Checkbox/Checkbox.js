import React from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({ small }) => (small ? "15px" : "25px")};
  width: ${({ small }) => (small ? "15px" : "25px")};
  background-color: ${({ theme }) => theme.grey};
  display: flex;
  justify-content: center;
  border-radius: 4px;

  transition: background-color 0.25s;

  ::after {
    width: ${({ small }) => (small ? "5px" : "8px")};
    height: ${({ small }) => (small ? "9px" : "15px")};
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    top: ${({ small }) => (small ? "2px" : "3px")};

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
  padding-left: ${({ small }) => (small ? "25px" : "35px")};
  cursor: pointer;
  font-size: ${({ small }) => (small ? "14px" : "16px")};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: ${({ small }) => (small ? "15px" : "25px")};
`;

const Wrapper = styled.div``;

const Checkbox = ({ text, className, setCheckbox, checkbox, small }) => {
  const { register: validate } = useFormContext();
  return (
    <Wrapper className={className}>
      <StyledLabel small={small}>
        <div>{text}</div>
        <StyledInput
          type="checkbox"
          onChange={() => {
            setCheckbox && setCheckbox(!checkbox);
          }}
        />
        <Checkmark small={small} />
      </StyledLabel>
    </Wrapper>
  );
};

export default Checkbox;
