import React from "react";
import Checkbox from "components/Checkbox/Checkbox";
import Header from "components/WTS/Header";
import styled from "styled-components";
import Feature from "components/WTS/Feature";

const Wrapper = styled.div``;

const StyledCheckbox = styled(Checkbox)`
  display: inline-block;

  :last-child {
    margin-left: 30px;
  }
`;

const Delivery = ({ defaultValue, checkbox, setCheckbox }) => {
  return (
    <Wrapper>
      <Header>Dostarczenie</Header>
      <div>
        <StyledCheckbox text="SHIP" />
        <StyledCheckbox
          text="MEET"
          setCheckbox={setCheckbox}
          checkbox={checkbox}
        />
      </div>
      {checkbox && <Feature name="Miasto" defaultValue={defaultValue} small />}
    </Wrapper>
  );
};

export default Delivery;
