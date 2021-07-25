import React from "react";
import styled from "styled-components";
import Header from "components/WTS/Header";

const StyledInput = styled.input`
  outline: none;
  width: 70%;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  padding: 5px 12px;

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.blue};
  }
`;

const Wrapper = styled.div``;

const Feature = ({ name, placeholder, defaultValue, ...props }) => {
  return (
    <Wrapper>
      <Header {...props}>{name}</Header>
      <StyledInput type="text" placeholder={placeholder} value={defaultValue} />
    </Wrapper>
  );
};

export default Feature;
