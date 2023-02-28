import React from "react";
import styled from "styled-components";
import { FaRocket } from "react-icons/fa";
import { useFormContext } from "react-hook-form";

const Wrapper = styled.div`
  margin-top: 8px;

  :first-child {
    margin-top: 0;
  }
`;

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
    border: solid ${({ theme }) => theme.white};
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

const Holder = styled.div`
  display: flex;
  align-items: center;
`;

const RocketIcon = styled(FaRocket)`
  font-size: 20px;
  color: ${({ theme }) => theme.blue};
  margin-left: 5px;
`;

const Alert = styled.div`
  padding: 5px;
  font-size: ${({ theme }) => theme.font_size_SM};
  background-color: ${({ theme }) => theme.red};
  color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.radious_SM};
  margin-left: 5px;

  @keyframes alert {
    0% {
      transform: skew(20deg, 0deg);
    }
    5% {
      transform: skew(-20deg, 0deg);
    }
    10% {
      transform: skew(20deg, 0deg);
    }
    10% {
      transform: skew(0deg, 0deg);
    }
    100% {
      transform: skew(0deg, 0deg);
    }
  }

  animation: alert 2.5s linear infinite alternate;
`;

const Checkbox = ({ name }: { name: string }) => {
  const { register } = useFormContext();
  const validator = register(name);

  return (
    <Wrapper>
      <StyledLabel>
        <Holder>
          Użyj znacznika{" "}
          {name === "alert" ? <Alert>Alert</Alert> : <RocketIcon />}
        </Holder>
        <StyledInput
          type="checkbox"
          {...validator}
          onChange={(e) => {
            validator.onChange(e);
          }}
        />
        <Checkmark />
      </StyledLabel>
    </Wrapper>
  );
};

export default Checkbox;
