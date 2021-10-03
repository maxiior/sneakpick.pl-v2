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

const Information = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.darkGrey};
  padding-bottom: 10px;
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

  return (
    <Wrapper>
      <Header nonPaddingBelow>Zdjęcia</Header>
      <Information>
        Pierwsze zdjęcie będzie zdjęciem głównym. Możesz dostać zdjęcia w
        formacie: .jpeg, .png lub .jpg. Maksymalny rozmiar pliku to 5MB.
      </Information>
      <Container>
        <Grid container spacing={2}>
          {photos}
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default Photos;
