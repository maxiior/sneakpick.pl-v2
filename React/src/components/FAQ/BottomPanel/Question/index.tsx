import { useState } from "react";
import { Wrapper, Container, Key, Arrow, Value } from "./styles";
import { iQuestion } from "./types";

const Question = ({ question, answer }: iQuestion) => {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <Container onClick={() => setOpen(!open)}>
        <Key open={open}>{question}</Key>
        <Arrow open={open} />
      </Container>
      {open && <Value>{answer}</Value>}
    </Wrapper>
  );
};

export default Question;
