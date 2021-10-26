import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.white};
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 80%;
`;

const Welcome = styled.div`
  font-weight: 500;
`;

const Help = styled.div`
  font-size: 25px;
  font-weight: 500;
`;

const TopPanel: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Welcome>Witamy w Centrum Pomocy Sneakpick</Welcome>
        <Help>Jak możemy Ci pomóc?</Help>
      </Container>
    </Wrapper>
  );
};

export default TopPanel;
