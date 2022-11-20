import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  increaseQuestionViews,
  fetchQuestion,
} from "api/services/talk.service";
import { useParams } from "react-router-dom";
import Comments from "components/Question/Comments";
import TopPanel from "components/Question/TopPanel";

const Wrapper = styled.div`
  width: 100%;
  padding: 30px;
  min-height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Question = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState({
    title: "",
    category: "",
    first_name: "",
    last_name: "",
    owner: "",
    published: "",
    profile_photo: "",
    is_bumped: true,
  });

  useEffect(() => {
    increaseQuestionViews(id!)
      .then(() => {})
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchQuestion(id!)
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {});
  }, []);

  return (
    <Wrapper>
      <Container>
        <TopPanel data={data} />
      </Container>
      <Comments />
    </Wrapper>
  );
};

export default Question;
