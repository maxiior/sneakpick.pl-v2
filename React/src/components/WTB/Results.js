import React from "react";
import styled from "styled-components";

const StyledResults = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  font-weight: 400;
  display: inline-block;
  margin-left: 20px;
`;

const Value = styled.span`
  color: ${({ theme }) => theme.blue};
  font-weight: 600;
  padding-left: 5px;
`;

const Results = ({ results, className }) => {
  return (
    <StyledResults className={className}>
      Wyniki:
      <Value>{results}</Value>
    </StyledResults>
  );
};

export default Results;
