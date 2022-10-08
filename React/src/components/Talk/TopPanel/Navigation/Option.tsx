import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-right: 20px;

  :last-child {
    margin: 0;
  }
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const StyledLabel = styled.label`
  position: relative;
  cursor: pointer;
`;

const StyledInput = styled.input`
  opacity: 0;
  position: absolute;

  :checked + ${Name} {
    color: ${({ theme }) => theme.blue};
  }
`;

const Option = ({ name }: { name: string }) => {
  return (
    <Wrapper>
      <StyledLabel>
        <StyledInput type="radio" name="order" />
        <Name>{name}</Name>
      </StyledLabel>
    </Wrapper>
  );
};

export default Option;
