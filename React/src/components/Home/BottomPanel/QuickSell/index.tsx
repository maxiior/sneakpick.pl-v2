import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

const Header = styled.div`
  color: ${({ theme }) => theme.black};
  font-weight: 500;
  font-size: 20px;
`;

const QuickSell: React.FC = () => {
  return (
    <Wrapper>
      <Header>Quicksell</Header>
    </Wrapper>
  );
};

export default QuickSell;
