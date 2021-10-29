import React from "react";
import styled from "styled-components";
import TopPanel from "components/FAQ/TopPanel";
import Question from "components/FAQ/Question";
import { questions } from "constants/faq";

const Wrapper = styled.div`
  width: 100%;
`;

const BottomPanel = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
`;

const Container = styled.div`
  width: 80%;
  border: 1px solid ${({ theme }) => theme.lightGrey};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const FAQ: React.FC = () => {
  return (
    <Wrapper>
      <TopPanel />
      <BottomPanel>
        <Container>
          {questions.map((e) => (
            <Question question={e.question} answer={e.answer} />
          ))}
        </Container>
      </BottomPanel>
    </Wrapper>
  );
};

export default FAQ;
