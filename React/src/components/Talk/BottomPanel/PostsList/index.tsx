import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import { getAllQuestions } from "api/services/talk.service";
import LoadingScreen from "./LoadingScreen";

const Wrapper = styled.div`
  width: 60%;
  padding: 20px;
`;

const PostsList = () => {
  const [questions, setQuestions] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    getAllQuestions()
      .then((response) => {
        if (response.status === 200) {
          setQuestions(response.data.results);
          setPending(false);
        }
      })
      .catch(() => {
        setPending(false);
      });
  }, []);

  return (
    <Wrapper>
      {pending ? (
        <LoadingScreen />
      ) : (
        <>
          {questions.map((e) => (
            <Post data={e} />
          ))}
        </>
      )}
    </Wrapper>
  );
};

export default PostsList;
