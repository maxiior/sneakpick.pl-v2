import React from "react";
import Checkbox from "components/WTS/Checkbox";
import Header from "components/WTS/Header";
import styled from "styled-components";
import Feature from "components/WTS/Feature";
import { connect } from "react-redux";

const Wrapper = styled.div``;

const StyledCheckbox = styled(Checkbox)`
  display: inline-block;

  :last-child {
    margin-left: 30px;
  }
`;

const Delivery = ({ defaultValue, currentFilter }) => {
  return (
    <Wrapper>
      <Header>Dostarczenie</Header>
      <div>
        <StyledCheckbox text="SHIP" value={currentFilter.SHIP} />
        <StyledCheckbox
          text="MEET"
          checkbox={currentFilter.MEET}
          value={currentFilter.MEET}
        />
      </div>
      {currentFilter.MEET && (
        <Feature name="Miasto" defaultValue={defaultValue} small />
      )}
    </Wrapper>
  );
};

const mapStateToProps = ({ addingItemReducer }) => {
  return {
    currentFilter: addingItemReducer.currentFilters,
  };
};

export default connect(mapStateToProps)(Delivery);
