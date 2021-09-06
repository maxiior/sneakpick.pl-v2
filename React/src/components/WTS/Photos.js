import React, { useState } from "react";
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
  const [selectedFiles, setSelectedFiles] = useState([]);

  var photos = [];

  for (var i = 0; i < 6; i++) {
    photos.push(
      <PhotoHolder
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        index={i}
      />
    );
  }

  console.log(selectedFiles);

  return (
    <Wrapper>
      <Header>Zdjęcia</Header>
      <Container>
        <Grid container spacing={2}>
          {photos}
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default Photos;
