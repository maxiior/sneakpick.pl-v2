import React from "react";
import styled from "styled-components";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { connect } from "react-redux";
import { addToCitiesArray as addToCitiesArrayAction } from "actions/WTS";
import { removeFromCitiesArray as removeFromCitiesArrayAction } from "actions/WTS";

const Wrapper = styled.div`
  height: 25px;
  width: 25px;
  background-color: ${({ theme, remove }) =>
    remove ? theme.grey : theme.blue};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  margin-left: 20px;

  :hover {
    opacity: 0.9;
  }
`;

const Plus = styled(AiOutlinePlus)`
  color: ${({ theme }) => theme.white};
  font-size: 15px;
`;

const Minus = styled(AiOutlineMinus)`
  color: ${({ theme }) => theme.white};
  font-size: 15px;
`;

const Button = ({ addToCitiesArray, removeFromCitiesArray, index, remove }) => {
  return (
    <Wrapper
      onClick={() => {
        if (remove) removeFromCitiesArray(index);
        else addToCitiesArray();
      }}
      remove={remove}
    >
      {remove ? <Minus /> : <Plus />}
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToCitiesArray: () => dispatch(addToCitiesArrayAction()),
  removeFromCitiesArray: (index) =>
    dispatch(removeFromCitiesArrayAction(index)),
});

export default connect(null, mapDispatchToProps)(Button);
