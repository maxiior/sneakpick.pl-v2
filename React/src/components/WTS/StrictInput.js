import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Button from "components/WTS/Button";
import { updateCitiesArray as updateCitiesArrayAction } from "actions/WTS";

const Wrapper = styled.div`
  display: flex;
  padding-top: 10px;
  align-items: center;
`;

const StyledInput = styled.input`
  outline: none;
  width: 70%;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  padding: 5px 12px;
  color: ${({ theme }) => theme.darkGrey};

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.blue};
  }
`;

const StrictInput = ({ updateCitiesArray, value, index, first }) => {
  return (
    <Wrapper>
      <StyledInput
        type="text"
        value={value}
        onChange={(e) => updateCitiesArray(index, e.target.value)}
      />
      {first ? <Button /> : <Button index={index} remove />}
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCitiesArray: (index, id) =>
    dispatch(updateCitiesArrayAction(index, id)),
});

export default connect(null, mapDispatchToProps)(StrictInput);
