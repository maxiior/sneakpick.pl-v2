import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.lightGrey};
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  padding: 20px;
  margin-bottom: 20px;

  animation: loading 1s linear infinite alternate;

  @keyframes loading {
    0% {
      background-color: ${({ theme }) => theme.lightGrey};
    }
    100% {
      background-color: ${({ theme }) => theme.grey};
    }
  }

  :last-child {
    margin-bottom: 0;
  }
`;

const TopPanel = styled.div`
  display: flex;
  width: 100%;
`;

const Holder = styled.div`
  min-width: 30%;
  padding: 10px;
`;

const Photo = styled.div`
  padding-bottom: 100%;
  position: relative;
  cursor: pointer;
  background-color: ${({ theme }) => theme.white};
`;

const Content = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.div`
  height: 16px;
  width: 100%;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.white};
`;

const Description = styled.div`
  height: 100px;
  width: 100%;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.white};
`;

const Button = styled.div`
  width: 80px;
  height: 36px;
  background-color: ${({ theme }) => theme.white};
`;

const BottomPanel = styled.div`
  display: flex;
  width: 100%;
  padding: 0 10px;
`;

const Informations = styled.div`
  height: 16px;
  width: 100%;
  background-color: ${({ theme }) => theme.white};
`;

const CommentsLoadingScreen = () => {
  return (
    <Wrapper>
      <TopPanel>
        <Holder>
          <Photo />
        </Holder>
        <Content>
          <div>
            <Title />
            <Description />
            <Button />
          </div>
        </Content>
      </TopPanel>
      <BottomPanel>
        <Informations />
      </BottomPanel>
    </Wrapper>
  );
};

export default CommentsLoadingScreen;
