import React, { useEffect } from "react";
import Checkbox from "components/WTS/Checkbox";
import Header from "components/WTS/Header";
import styled from "styled-components";
import StrictInput from "components/WTS/StrictInput";
import { setCitiesArray } from "store/creator/actions";
import { useDispatch, useSelector } from "react-redux";

const Wrapper = styled.div``;

const StyledCheckbox = styled(Checkbox)`
  display: inline-block;

  :last-child {
    margin-left: 30px;
  }
`;

const Delivery = ({ defaultValue }) => {
  const dispatch = useDispatch();
  const { MEET, cities } = useSelector(
    (state) => state.creatorSlice.currentFilters
  );

  useEffect(() => {
    dispatch(setCitiesArray(defaultValue));
  }, [MEET]);

  return (
    <Wrapper>
      <Header>Dostarczenie</Header>
      <div>
        <StyledCheckbox type="SHIP" />
        <StyledCheckbox type="MEET" />
      </div>
      {MEET && (
        <>
          <Header small>Miasto</Header>
          {cities.map((city, i) => (
            <StrictInput value={city} index={i} first={i === 0} />
          ))}
        </>
      )}
    </Wrapper>
  );
};

export default Delivery;
