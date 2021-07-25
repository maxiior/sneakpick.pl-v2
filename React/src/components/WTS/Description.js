import React, { useState } from "react";
import styled from "styled-components";
import Header from "components/WTS/Header";

const TextArea = styled.textarea`
  outline: none;
  width: 70%;
  height: 150px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  padding: 5px 12px;
  resize: none;
  display: block;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.darkGrey};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.blue};
  }

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.blue};
  }
`;

const Counter = styled.div`
  display: inline-block;
  font-size: 12px;
  margin-left: 15px;
  color: ${({ color }) => color};
`;

const StyledHeader = styled(Header)`
  display: inline-block;
`;

const Wrapper = styled.div``;

const Feature = ({ name, placeholder }) => {
  const [counter, setCounter] = useState(1000);
  const [color, setColor] = useState("black");

  const descriptionLength = (e) => {
    const value = 1000 - e.target.value.length;
    setCounter(value);
    if (value <= 50) setColor("red");
    else setColor("black");
  };

  return (
    <Wrapper>
      <StyledHeader>{name}</StyledHeader>
      <Counter color={color}>Pozostało {counter} znaków</Counter>
      <TextArea
        placeholder={placeholder}
        onChange={(e) => descriptionLength(e)}
        maxLength="1000"
      />
    </Wrapper>
  );
};

export default Feature;
