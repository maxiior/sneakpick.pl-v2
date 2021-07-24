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
  margin-left: 25px;

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.blue};
  }
`;

const Feature = ({ name, placeholder }) => {
  return (
    <div>
      <Header>{name}</Header>
      <StyledInput type="text" placeholder={placeholder} />
    </div>
  );
};

export default Feature;
