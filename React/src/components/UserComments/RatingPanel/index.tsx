import { useState, useRef } from "react";
import styled from "styled-components";
import Rating from "components/UserComments/RatingPanel/Rating";
import { useAppDispatch } from "hooks/useAppDispatch";
import { addComment } from "store/profile/actions";
import { useParams } from "react-router-dom";

const Error = styled.div`
  background-color: ${({ theme }) => theme.red};
  padding: 10px;
  color: white;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  margin-bottom: 20px;
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
  display: flex;
  text-align: center;
  align-items: center;

  :hover {
    opacity: 0.9;
  }

  margin-left: ${({ cancel }) => (cancel ? "10px" : "0px")};
`;

const Holder = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Paragraph = styled.div`
  font-size: 12px;
  margin-bottom: 3px;
  color: ${({ theme }) => theme.darkGrey};
`;

const RatingPanel = ({ setRatingPanel }: { setRatingPanel: Function }) => {
  const input = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useParams<{ user: string }>();

  const ratingProcess = () => {
    if (!content && rating === 0) setError(true);
    else {
      dispatch(
        addComment({
          user: user!,
          content: content,
          rating: rating,
        })
      ).then(() => {
        setRatingPanel(false);
      });
    }
  };

  return (
    <Wrapper>
      {error && (
        <Error>Komentarz musi zawierać zarówno treść jak i ocenę.</Error>
      )}
      <Paragraph>Wybierz ocenę</Paragraph>
      <Rating rating={rating} setRating={setRating} setError={setError} />
      <Input
        ref={input}
        placeholder="Dodaj komentarz..."
        rows={1}
        onChange={(e) => {
          e.target.style.height = "";
          e.target.style.height = e.target.scrollHeight + "px";
          setContent(e.target.value);
          setError(false);
        }}
        maxLength={500}
        value={content}
      />

      <Holder>
        <Button onClick={() => ratingProcess()}>Dodaj ocenę</Button>
        <Button
          cancel
          onClick={() => {
            input.current!.style.height = "32px";
            setContent("");
            setRating(0);
            setError(false);
          }}
        >
          Wyczyść
        </Button>
        <Button cancel onClick={() => setRatingPanel(false)}>
          Anuluj
        </Button>
      </Holder>
    </Wrapper>
  );
};

export default RatingPanel;
