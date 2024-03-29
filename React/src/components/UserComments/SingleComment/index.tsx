import { useEffect } from "react";
import styled from "styled-components";
import Rating from "components/UserComments/SingleComment/Rating";
import { Link } from "react-router-dom";
import { iComment } from "components/UserComments/types/types";
import { useState } from "react";
import AnswearPanel from "components/UserComments/SingleComment/AnswearPanel";
import { useAppSelector } from "hooks/useAppSelector";
import { formatDate } from "functions/formatDate";
import { useAppDispatch } from "hooks/useAppDispatch";
import { removeComment } from "store/profile/actions";
import { fetchUser } from "store/profile/actions";
import Answear from "components/UserComments/SingleComment/Answear";
import { getUserPhoto } from "functions/getUserPhoto";
import { routes } from "routes";

const Wrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  margin-bottom: 15px;
  padding: 20px;

  :last-child {
    border-bottom: 0;
  }

  @media only screen and (max-width: 768px) {
    padding: 20px 0px;
  }
`;

const Avatar = styled(Link)<{ photo?: string }>`
  height: 50px;
  width: 50px;
  background-color: ${({ theme }) => theme.lightGrey};
  border-radius: 50%;
  cursor: pointer;
  background-image: url(${({ photo }) => photo});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: block;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.veryDarkGrey};
`;

const Time = styled.div`
  font-size: 12px;
  margin-top: -2px;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.veryDarkGrey};
`;

const Informations = styled.div`
  width: 100%;
`;

const Content = styled.div`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.font_size_MD};
`;

const Button = styled.div<{ remove?: boolean }>`
  border-radius: 5px;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme, remove }) =>
    remove ? theme.grey : theme.blue};
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.font_size_MD};
  cursor: pointer;
  user-select: none;
  :hover {
    opacity: 0.9;
  }

  @media only screen and (max-width: 768px) {
    margin-top: 10px;
    width: 100%;
    text-align: center;
  }
`;

const Holder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightPanel = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 20px;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const LeftPanel = styled.div``;

const SingleComment = ({ data, user }: { data: iComment; user: string }) => {
  const [answearPanel, setAnswearPanel] = useState(false);
  const selector = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<{ time: string; wait: number }>(
    formatDate(data.created_at)
  );

  const removeingCommentProcess = () => {
    dispatch(removeComment(data.id))
      .then(() => {})
      .catch(() => {});
  };

  const updateDate = () => {
    if (date.wait !== 0) {
      setTimeout(() => {
        setDate(formatDate(data.created_at));
        updateDate();
      }, date.wait);
    }
  };

  useEffect(() => {
    setDate(formatDate(data.created_at));
    updateDate();
  }, [data.created_at]);

  return (
    <Wrapper>
      <Container>
        <LeftPanel>
          <Avatar
            to={routes.USER_PROFILE_PRODUCTS.replace(":user", data.author.id)}
            photo={getUserPhoto(data.author.profile_photo)}
          />
        </LeftPanel>
        <RightPanel>
          <Informations>
            <Name
              to={routes.USER_PROFILE_PRODUCTS.replace(":user", data.author.id)}
            >
              {data.author.first_name} {data.author.last_name}
            </Name>
            <Time>{date.time}</Time>
            <Rating rating={data.rating} />
            <Content>{data.content}</Content>
          </Informations>
          <Holder>
            {!answearPanel &&
              user === selector.user_id &&
              data.responses.length === 0 && (
                <Button onClick={() => setAnswearPanel(true)}>Odpowiedz</Button>
              )}
            {selector.user_id === data.author.id && (
              <Button remove onClick={() => removeingCommentProcess()}>
                Usuń
              </Button>
            )}
          </Holder>
        </RightPanel>
      </Container>
      {data.responses.length !== 0 && (
        <Answear data={data.responses[0]} me={selector.user_id} />
      )}
      {answearPanel && (
        <AnswearPanel
          setAnswearPanel={setAnswearPanel}
          user={user}
          comment_id={data.id}
        />
      )}
    </Wrapper>
  );
};

export default SingleComment;
