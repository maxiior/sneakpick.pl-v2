import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Button from "components/WTS/Button";

const Wrapper = styled.div`
  display: flex;
  padding-top: 10px;
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

const StrictInput = ({ changeState, filterType, city, iteration }) => {
  return (
    <Wrapper>
      <StyledInput
        type="text"
        onChange={(e) => changeState(filterType, e.target.value, "text")}
      />
      <Button iteration={iteration} remove />
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  // changeState: (filterType, id, input) =>
  //   dispatch(changeStateAction(filterType, id, input)),
});

export default connect(null, mapDispatchToProps)(StrictInput);
