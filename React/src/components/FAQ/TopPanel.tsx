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
  user-select: none;
`;

const Container = styled.div`
  width: 80%;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    text-align: center;
  }
`;

const Header = styled.div`
  font-size: 50px;
  font-weight: 500;
`;

const TopPanel: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Header>FAQ</Header>
      </Container>
    </Wrapper>
  );
};

export default TopPanel;
