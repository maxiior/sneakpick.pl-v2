import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
`;

const Option = styled.div`
  width: 50%;
  font-size: 20px;
  padding: 20px 25px;
  background-color: red;
  display: inline-block;
  height: 100%;
`;

const Value = styled.div`
  width: 50%;
  background-color: blue;
  display: inline-flex;
  padding: 20px 25px;
  justify-content: flex-end;
  height: 100%;
`;

const StyledInput = styled.input`
  outline: none;
  width: 300px;
  border: none;
  border-bottom: 2px solid #d6d6d6;
  padding: 10px 12px;
`;

const Specification = ({ name }) => {
  return (
    <Wrapper>
      <Option>{name}</Option>
      <Value>
        <StyledInput type="text" />
      </Value>
    </Wrapper>
  );
};

export default Specification;
