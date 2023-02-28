import React from "react";
import styled from "styled-components";

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

const Avatar = styled.div`
  height: 50px;
  width: 50px;
  background-color: ${({ theme }) => theme.lightGrey};
  border-radius: 50%;
  animation: loading 1s linear infinite alternate;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.div`
  background-color: ${({ theme }) => theme.lightGrey};
  width: 150px;
  height: 15px;
  animation: loading 1s linear infinite alternate;
`;

const Time = styled.div`
  margin-top: 2px;
  background-color: ${({ theme }) => theme.lightGrey};
  width: 70px;
  height: 10px;
  animation: loading 1s linear infinite alternate;
`;

const Rating = styled.div`
  margin-top: 4px;
  background-color: ${({ theme }) => theme.lightGrey};
  width: 50px;
  height: 15px;
  animation: loading 1s linear infinite alternate;
`;

const Holder = styled.div`
  width: 100%;
`;

const Content = styled.div`
  margin-top: 10px;
  width: 60%;
  height: 15px;
  background-color: ${({ theme }) => theme.lightGrey};

  animation: loading 1s linear infinite alternate;

  @keyframes loading {
    0% {
      background-color: ${({ theme }) => theme.lightGrey};
    }
    100% {
      background-color: ${({ theme }) => theme.grey};
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    width: 80%;
  }
`;

const RightPanel = styled.div`
  width: 100%;
  padding-left: 20px;
`;

const LeftPanel = styled.div``;

const CommentsLoadingScreen = () => {
  return (
    <Wrapper>
      <Container>
        <LeftPanel>
          <Avatar />
        </LeftPanel>
        <RightPanel>
          <Holder>
            <Name />
            <Time />
            <Rating />
            <Content />
          </Holder>
        </RightPanel>
      </Container>
    </Wrapper>
  );
};

export default CommentsLoadingScreen;
