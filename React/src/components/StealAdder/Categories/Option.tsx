import React from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";

const Wrapper = styled.div<{ checked: boolean }>`
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.white};
  border-radius: 5px;
  margin-right: 5px;
  user-select: none;
  display: inline-block;
  filter: ${({ checked }) => (checked ? "opacity(100%)" : "opacity(50%)")};
`;

const Name = styled.div`
  font-size: ${({ theme }) => theme.font_size_SM};
  display: flex;
  padding: 5px;
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

const Option = ({ name }: { name: string }) => {
  const { register, watch } = useFormContext();
  const validator = register("category");

  return (
    <Wrapper checked={watch()["category"] == name.toLowerCase()}>
      <StyledLabel>
        <StyledInput
          type="radio"
          value={name.toLowerCase()}
          {...validator}
          onChange={(e) => {
            validator.onChange(e);
          }}
        />
        <Name>
          <div>{name}</div>
        </Name>
      </StyledLabel>
    </Wrapper>
  );
};

export default Option;
