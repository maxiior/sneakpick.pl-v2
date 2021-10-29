import { useState } from "react";
import styled, { css } from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const Arrow = styled(MdKeyboardArrowDown)<{ open: Boolean }>`
  transition-duration: 0.5s;
  color: ${({ theme }) => theme.black};

  ${({ open }) =>
    open &&
    css`
      transform: rotate(180deg);
      color: ${({ theme }) => theme.blue};
    `}
`;

const Header = styled.div<{ open: Boolean }>`
  transition-duration: 0.5s;
  color: ${({ theme }) => theme.black};
  font-weight: 500;
  user-select: none;

  ${({ open }) =>
    open &&
    css`
      color: ${({ theme }) => theme.blue};
    `};
`;

const Content = styled.div`
  text-align: justify;
  text-justify: inter-word;
  margin-top: 15px;
  padding: 0 30px;
  font-size: 14px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
`;

interface iComponent {
  question: String;
  answer: String;
}

const Question = ({ question, answer }: iComponent) => {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <Container onClick={() => setOpen(!open)}>
        <Header open={open}>{question}</Header>
        <Arrow open={open} />
      </Container>
      {open && <Content>{answer}</Content>}
    </Wrapper>
  );
};

export default Question;
