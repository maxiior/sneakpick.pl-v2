import React from "react";
import styled from "styled-components";
import { name } from "constants/name";

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

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    text-align: center;
  }
`;

const Header = styled.div`
  font-weight: 500;
`;

const Paragraph = styled.div`
  font-size: 25px;
  font-weight: 500;
`;

const TopPanel: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Header>Witamy w Centrum Pomocy {name}</Header>
        <Paragraph>Jak możemy Ci pomóc?</Paragraph>
      </Container>
    </Wrapper>
  );
};

export default TopPanel;
