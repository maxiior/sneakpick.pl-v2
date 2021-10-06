import React from "react";
import styled from "styled-components";
import Button from "components/WTS/Button";
import { updateCitiesArray } from "store/creator/actions";
import { useDispatch } from "react-redux";

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

const StrictInput = ({ value, index, first }) => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <StyledInput
        type="text"
        value={value}
        onChange={(e) =>
          dispatch(updateCitiesArray({ index, id: e.target.value }))
        }
      />
      {first ? <Button /> : <Button index={index} remove />}
    </Wrapper>
  );
};

export default StrictInput;
