import React, { useEffect } from "react";
import Checkbox from "components/WTS/Checkbox";
import Header from "components/WTS/Header";
import styled from "styled-components";
import { connect } from "react-redux";
import StrictInput from "components/WTS/StrictInput";
import { setCitiesArray as setCitiesArrayAction } from "actions/WTS";

const Wrapper = styled.div``;

const StyledCheckbox = styled(Checkbox)`
  display: inline-block;

  :last-child {
    margin-left: 30px;
  }
`;

const Delivery = ({ defaultValue, currentFilter, setCitiesArray }) => {
  useEffect(() => {
    setCitiesArray(defaultValue);
  }, [currentFilter.MEET]);

  return (
    <Wrapper>
      <Header>Dostarczenie</Header>
      <div>
        <StyledCheckbox text="SHIP" />
        <StyledCheckbox text="MEET" />
      </div>
      {currentFilter.MEET && (
        <>
          <Header small>Miasto</Header>
          {currentFilter.cities.map((city, i) => (
            <StrictInput value={city} index={i} first={i === 0} />
          ))}
        </>
      )}
    </Wrapper>
  );
};

const mapStateToProps = ({ addingItemReducer }) => {
  return {
    currentFilter: addingItemReducer.currentFilters,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setCitiesArray: (id) => dispatch(setCitiesArrayAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
