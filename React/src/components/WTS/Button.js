import React from "react";
import styled from "styled-components";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { addToCitiesArray } from "store/creator/actions";
import { removeFromCitiesArray } from "store/creator/actions";
import { useDispatch } from "react-redux";

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

const Button = ({ index, remove }) => {
  const dispatch = useDispatch();
  return (
    <Wrapper
      onClick={() => {
        if (remove) dispatch(removeFromCitiesArray(index));
        else dispatch(addToCitiesArray());
      }}
      remove={remove}
    >
      {remove ? <Minus /> : <Plus />}
    </Wrapper>
  );
};

export default Button;
