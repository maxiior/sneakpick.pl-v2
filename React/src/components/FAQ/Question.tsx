import { useState } from "react";
import styled from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";
import { iQuestion } from "types/FAQ/question";

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Key = styled.div<{ open: boolean }>`
  transition-duration: 0.5s;
  color: ${({ theme, open }) => (open ? theme.blue : theme.black)};
  font-weight: 500;
  user-select: none;
  font-size: 18px;
`;

const Arrow = styled(MdKeyboardArrowDown)<{ open: boolean }>`
  transition-duration: 0.5s;
  color: ${({ theme, open }) => (open ? theme.blue : theme.black)};
  font-size: 25px;
  transform: ${({ open }) => open && "rotate(180deg)"};
`;

const Value = styled.div`
  text-align: justify;
  text-justify: inter-word;
  margin-top: 15px;
  padding: 0 30px;
  font-size: 14px;
`;

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
