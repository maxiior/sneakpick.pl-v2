import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "routes";
import { colorwaysTheme } from "theme/ColorwaysTheme";
import { IPost } from "../types/post";
import { useAppSelector } from "hooks/useAppSelector";
import { bumpQuestion } from "api/services/talk.service";

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.black};
`;

const Item = styled.div`
  font-size: ${({ theme }) => theme.font_size_SM};
  color: ${({ theme }) => theme.darkGrey};
`;

const Description = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  padding: 20px 0;
`;

const Tag = styled.span<{ category: string }>`
  color: ${({ theme }) => theme.white};
  background-color: ${({ category }) =>
    category === "lc"
      ? colorwaysTheme.red
      : category === "id"
      ? colorwaysTheme.orange
      : category === "pc"
      ? colorwaysTheme.green
      : category === "fit"
      ? colorwaysTheme.blue
      : colorwaysTheme.purple};
  padding: 3px 7px;
  font-size: 14px;
  border-radius: 5px;
`;

const Container = styled(Link)`
  text-decoration: none;
`;

const Button = styled.span<{ active: boolean }>`
  background-color: ${({ theme, active }) =>
    active ? theme.grey : theme.blue};
  color: ${({ theme }) => theme.white};
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.font_size_MD};
  border-radius: ${({ theme }) => theme.radious_SM};
  cursor: pointer;
  user-select: none;

  :hover {
    filter: ${({ active }) => !active && "opacity(90%)"};
  }
`;

const Holder = styled.div`
  display: flex;
  align-items: center;
`;

const Counter = styled.div`
  color: ${({ theme }) => theme.blue};
  font-size: 16px;
  margin-left: 10px;
`;

const Views = styled.div`
  font-size: ${({ theme }) => theme.font_size_MD};
  color: ${({ theme }) => theme.darkGrey};
  margin-top: 20px;
  user-select: none;
`;

const Content = ({ data }: { data: IPost }) => {
  const { isAuthenticated } = useAppSelector((state) => state.authSlice);
  const [bumped, setBumped] = useState(data.is_bumped);
  const [counter, setCounter] = useState(data.total_bumps);

  const bumpQuestionProcess = (id: string) => {
    bumpQuestion(id)
      .then((response) => {
        if (response.status === 200) {
          setBumped(true);
          setCounter(counter + 1);
        }
      })
      .catch(() => {});
  };

  return (
    <Wrapper>
      <Container to={routes.QUESTION.replace(":question", data.id)}>
        <Title>
          {data.title}{" "}
          <Tag category={data.category}>{data.category.toUpperCase()}</Tag>
        </Title>
        <Item>{data.item}</Item>
        <Description>{data.description}</Description>
        {isAuthenticated && (
          <Holder>
            <Button
              active={bumped}
              onClick={() => !bumped && bumpQuestionProcess(data.id)}
            >
              Bump
            </Button>
            <Counter>+{counter}</Counter>
          </Holder>
        )}
      </Container>
      <Views>{data.views} wyświetleń</Views>
    </Wrapper>
  );
};

export default Content;