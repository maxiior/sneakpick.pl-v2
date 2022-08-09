import React, { useState } from "react";
import Header from "components/WTS/Header";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import PhotoHolder from "components/WTS/PhotoHolder";
import { iPhotos } from "./types/photos";
import { Error } from "components/WTS/Error";

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

const Photos = React.memo(
  ({ images, setImages, setImagesError, imagesError }: iPhotos) => {
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
        <Header nonPaddingBelow>Zdjęcia</Header>
        <Information>
          Pierwsze zdjęcie będzie zdjęciem głównym. Możesz dodawać zdjęcia w
          formacie: .jpeg, .png lub .jpg. Maksymalny rozmiar pliku to 5MB.
        </Information>
        {imagesError && <Error $mb>{imagesError}</Error>}
        <Container>
          <Grid container spacing={1}>
            {photos}
          </Grid>
        </Container>
      </Wrapper>
    );
  }
);

export default Photos;
