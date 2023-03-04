import React from "react";
import Header from "./Header";
import styled from "styled-components";
import Checkbox from "./Checkbox";

const Wrapper = styled.div``;

const Container = styled.div`
  margin-top: 10px;
`;

const Extras = () => {
  return (
    <Wrapper>
      <Header>Dodatkowe opcje</Header>
      <Container>
        <Checkbox name="Item podlega wymianie (WTT)" type="for_trade" />
      </Container>
    </Wrapper>
  );
};

export default Extras;
