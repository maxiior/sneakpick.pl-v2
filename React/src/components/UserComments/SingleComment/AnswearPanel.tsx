import { Dispatch, useState, useRef } from "react";
import styled from "styled-components";
import { addComment } from "store/profile/actions";
import { useAppDispatch } from "hooks/useAppDispatch";

const Wrapper = styled.div`
  margin-top: 20px;
`;

const Input = styled.textarea`
  background-color: ${({ theme }) => theme.lightGrey};
  min-height: 20px;
  width: 100%;
  border-radius: 5px;
  padding: 8px 12px;
  outline: none;
  font-size: ${({ theme }) => theme.font_size_MD};
  user-select: none;
  overflow-wrap: break-word;
  overflow: hidden;
  border: 0;
  resize: none;
`;

const Button = styled.div<{ cancel?: boolean }>`
  border-radius: 5px;
  color: ${({ theme, cancel }) => (cancel ? theme.blue : theme.white)};
  background-color: ${({ theme, cancel }) =>
    cancel ? theme.white : theme.blue};
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.font_size_MD};
  cursor: pointer;
  user-select: none;
  text-align: center;
  :hover {
    opacity: 0.9;
  }

  margin-left: ${({ cancel }) => (cancel ? "10px" : "0px")};
`;

const Holder = styled.div`
  display: flex;
  margin-top: 10px;

  @media only screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px;
  }
`;

const AnswearPanel = ({
  setAnswearPanel,
  user,
  comment_id,
}: {
  setAnswearPanel: Dispatch<boolean>;
  user: string;
  comment_id: string;
}) => {
  const input = useRef<HTMLTextAreaElement>(null);
  const [answear, setAnswear] = useState("");
  const dispatch = useAppDispatch();

  const answearingProcess = () => {
    if (answear) {
      dispatch(
        addComment({
          user: user,
          content: answear,
          parent: comment_id,
        })
      )
        .then(() => {
          setAnswearPanel(false);
        })
        .catch(() => {});
    } else setAnswearPanel(false);
  };

  return (
    <Wrapper>
      <Input
        ref={input}
        placeholder="Dodaj odpowiedź..."
        rows={1}
        onChange={(e) => {
          e.target.style.height = "";
          e.target.style.height = e.target.scrollHeight + "px";
          setAnswear(e.target.value);
        }}
        maxLength={500}
        value={answear}
      />
      <Holder>
        <Button onClick={() => answearingProcess()}>Odpowiedz</Button>
        <Button
          cancel
          onClick={() => {
            input.current!.style.height = "32px";
            setAnswear("");
          }}
        >
          Wyczyść
        </Button>
        <Button cancel onClick={() => setAnswearPanel(false)}>
          Anuluj
        </Button>
      </Holder>
    </Wrapper>
  );
};

export default AnswearPanel;
