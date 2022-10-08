import React, { useState } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import PhotoHolder from "components/QuestionAdder/PhotoHolder";
import { iPhotos } from "./types/photos";

const Wrapper = styled.div`
  margin-top: 20px;
  width: 70%;
`;

const Error = styled.div`
  background-color: ${({ theme }) => theme.red};
  padding: 5px;
  color: white;
  font-size: 12px;
  margin-top: 5px;
`;

const Container = styled.div`
  display: flex;
`;

const Header = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const Information = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.darkGrey};
  padding-bottom: 10px;
`;

const Photos = React.memo(
  ({ images, setImages, setImagesError, imagesError }: any) => {
    var photos = [];

    for (var i = 0; i < 6; i++) {
      photos.push(
        <PhotoHolder
          images={images}
          setImages={setImages}
          setImagesError={setImagesError}
          index={i}
          key={i}
        />
      );
    }

    return (
      <Wrapper>
        <Header>Zdjęcia</Header>
        <Information>
          Pierwsze zdjęcie będzie zdjęciem głównym. Możesz dodawać zdjęcia w
          formacie: .jpeg, .png lub .jpg. Maksymalny rozmiar pliku to 10MB.
        </Information>
        <Container>
          <Grid container spacing={1}>
            {photos}
          </Grid>
        </Container>
        {imagesError && <Error>{imagesError}</Error>}
      </Wrapper>
    );
  }
);

export default Photos;
