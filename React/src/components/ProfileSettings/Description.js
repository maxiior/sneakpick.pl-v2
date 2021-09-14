import React, { useState } from "react";
import styled from "styled-components";

const TextArea = styled.textarea`
  outline: none;
  width: 300px;
  height: 150px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid
    ${({ theme, error }) => (error ? theme.red : theme.grey)};
  padding: 5px;
  resize: none;
  display: block;
  color: ${({ theme }) => theme.darkGrey};

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.grey};
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
  color: ${({ color }) => color};
`;

const Header = styled.div``;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const Container = styled.div``;

const Description = () => {
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
      <Header>Kilka słów o Tobie</Header>
      <Container>
        <TextArea
          name="description"
          onChange={(e) => {
            descriptionLength(e);
          }}
          placeholder="Powiedz coś więcej o sobie..."
          maxLength="1000"
        />
        <Counter color={color}>Pozostało {counter} znaków</Counter>
      </Container>
    </Wrapper>
  );
};

export default Description;
