import React from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";

const Wrapper = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  user-select: none;
  display: inline-block;
`;

const Name = styled.div`
  font-size: 16px;
  padding: 10px;
  filter: opacity(50%);
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const StyledLabel = styled.label`
  position: relative;
  cursor: pointer;
  display: flex;
`;

const StyledInput = styled.input`
  opacity: 0;
  position: absolute;

  :checked + ${Name} {
    filter: opacity(100%);
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  padding-right: 5px;
`;

const Option = ({
  name,
  icon,
  color,
  tag,
  setCategory,
  setValue,
}: {
  name: string;
  icon?: any;
  color: string;
  tag: string;
  setCategory: Function;
  setValue: Function;
}) => {
  const { register } = useFormContext();
  const validator = register("category");

  return (
    <Wrapper color={color}>
      <StyledLabel>
        <StyledInput
          type="radio"
          {...register("category")}
          onChange={(e) => {
            validator.onChange(e);
            setCategory(tag);
            setValue("isIdentityCheck", tag === "id");
          }}
        />
        <Name>
          <Icon>{icon}</Icon>
          <div>{name}</div>
        </Name>
      </StyledLabel>
    </Wrapper>
  );
};

export default Option;
