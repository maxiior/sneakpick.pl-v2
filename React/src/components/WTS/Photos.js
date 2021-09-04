import React from "react";
import Header from "components/WTS/Header";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import PhotoHolder from "components/WTS/PhotoHolder";

const Wrapper = styled.div``;

const Container = styled.div`
  width: 70%;
  display: flex;
`;

const Photos = () => {
  return (
    <Wrapper>
      <Header>Zdjęcia</Header>
      <Container>
        <Grid container spacing={2}>
          <PhotoHolder />
          <PhotoHolder />
          <PhotoHolder />
          <PhotoHolder />
          <PhotoHolder />
          <PhotoHolder />
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default Photos;
