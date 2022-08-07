import { useEffect, useState } from "react";
import styled from "styled-components";
import { iComment } from "components/UserComments/types/types";
import { Link } from "react-router-dom";
import { formatDate } from "functions/formatDate";
import { useAppDispatch } from "hooks/useAppDispatch";
import { removeAnswear } from "store/profile/actions";
import { getUserPhoto } from "functions/getUserPhoto";

const Wrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  padding: 20px 20px 0px 20px;

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
  background-color: ${({ theme }) => theme.grey};
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
  font-size: 14px;
`;

const Button = styled.div<{ remove?: boolean }>`
  border-radius: 5px;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme, remove }) =>
    remove ? theme.grey : theme.blue};
  padding: 10px 20px;
  font-size: 14px;
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

const Paragraph = styled.div`
  font-size: 12px;
  margin-top: -2px;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.blue};
`;

const Answear = ({ data, me }: { data: iComment; me: string }) => {
  const [date, setDate] = useState<{ time: string; wait: number }>(
    formatDate(data.created_at)
  );
  const dispatch = useAppDispatch();
  console.log(data);

  const removeingCommentProcess = () => {
    dispatch(removeAnswear({ id: data.id, parent: data.parent }))
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
    updateDate();
  });

  return (
    <Wrapper>
      <Container>
        <LeftPanel>
          <Avatar to="" photo={getUserPhoto(data.author.profile_photo)} />
        </LeftPanel>
        <RightPanel>
          <Informations>
            <Name to="">
              {data.author.first_name} {data.author.last_name}
            </Name>
            <Time>{date.time}</Time>
            <Paragraph>Odpowiedź</Paragraph>
            <Content>{data.content}</Content>
          </Informations>
          <Holder>
            {me === data.author.id && (
              <Button remove onClick={() => removeingCommentProcess()}>
                Usuń
              </Button>
            )}
          </Holder>
        </RightPanel>
      </Container>
    </Wrapper>
  );
};

export default Answear;
