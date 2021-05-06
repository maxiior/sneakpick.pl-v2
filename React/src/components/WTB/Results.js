import React from "react";
import styled from "styled-components";

const StyledResults = styled.div`
  color: #777;
  font-weight: 400;
  display: inline-block;
  margin-left: 20px;
`;

const Value = styled.span`
  color: #00b4ff;
  font-weight: 600;
  padding-left: 5px;
`;

const Results = ({ value }) => {
  return (
    <StyledResults>
      Wyniki:
      <Value>2440</Value>
    </StyledResults>
  );
};

export default Results;
