import React from "react";
import Question from "components/FAQ/BottomPanel/Question";
import { Wrapper, Container } from "./styles";
import { questions } from "constants/faq";

const BottomPanel: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        {questions.map((e, i) => (
          <Question key={i} question={e.question} answer={e.answer} />
        ))}
      </Container>
    </Wrapper>
  );
};

export default BottomPanel;
