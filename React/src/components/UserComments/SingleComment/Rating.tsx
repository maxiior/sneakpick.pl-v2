import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const Step = styled.div<{ blank?: boolean }>`
  height: 15px;
  width: 7px;
  background-color: ${({ theme, blank }) => (blank ? theme.grey : theme.blue)};
  margin-left: 1px;
  :first-child {
    margin: 0;
  }
`;

const Rating = ({ rating }: { rating: number }) => {
  const steps = [1, 2, 3, 4, 5];

  return (
    <Wrapper>
      {steps.map((e) => {
        return e <= rating ? <Step /> : <Step blank />;
      })}
    </Wrapper>
  );
};

export default Rating;
