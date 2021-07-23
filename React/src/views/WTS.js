import React from "react";
import styled from "styled-components";
import Specification from "components/WTS/Specification";

const Wrapper = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 60%;
`;

const Header = styled.div`
  font-size: 35px;
`;

const Panel = styled.div``;

const WTS = () => {
  return (
    <Wrapper>
      <Container>
        <Header>WANT TO SELL</Header>
        <Panel>
          <Specification name="Nazwa przedmiotu" />
        </Panel>
      </Container>
    </Wrapper>
  );
};

export default WTS;
