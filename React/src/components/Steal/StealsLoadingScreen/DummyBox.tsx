import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

const Wrapper = styled.div`
  padding-bottom: 100%;
  position: relative;
  display: block;

  animation: loading 1s linear infinite alternate;

  @keyframes loading {
    0% {
      background-color: ${({ theme }) => theme.lightGrey};
    }
    100% {
      background-color: ${({ theme }) => theme.grey};
    }
  }
`;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Name = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: 5px;
  width: 100px;
  height: 15px;
`;

const NameHolder = styled.div`
  width: 100%;
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
`;

const Tag = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.radious_SM};
  width: 40px;
  height: 15px;
  margin-right: 5px;
`;

const TagsHolder = styled.div`
  display: flex;
  padding: 10px;
`;

const DummyBox = () => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Wrapper>
        <Container>
          <TagsHolder>
            <Tag />
            <Tag />
            <Tag />
          </TagsHolder>
          <NameHolder>
            <Name />
          </NameHolder>
        </Container>
      </Wrapper>
    </Grid>
  );
};

export default DummyBox;
