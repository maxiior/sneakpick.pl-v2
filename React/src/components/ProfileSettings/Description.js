import { useState } from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    display: block;
  }
`;

const Header = styled.div`
  font-size: ${({ theme }) => theme.font_size_MD};
  width: 150px;
  color: ${({ theme }) => theme.darkGrey};
  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    margin-bottom: 3px;
  }
`;

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

const Description = ({ value, setData }) => {
  const [counter, setCounter] = useState(1000);
  const [color, setColor] = useState("black");

  const descriptionLength = (e) => {
    const value = 1000 - e.target.value.length;
    setCounter(value);
    if (value <= 50) setColor("red");
    else setColor("black");
  };

  const { register } = useFormContext();

  return (
    <Wrapper>
      <Header>Kilka słów o Tobie</Header>
      <div>
        <TextArea
          maxLength="1000"
          value={value}
          {...register("description")}
          onChange={(e) => {
            descriptionLength(e);
            setData((data) => ({ ...data, description: e.target.value }));
          }}
          placeholder="Powiedz coś więcej o sobie..."
        />
        <Counter color={color}>Pozostało {counter} znaków</Counter>
      </div>
    </Wrapper>
  );
};

export default Description;
