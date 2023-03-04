import React from "react";
import styled from "styled-components";
import PhotoHolder from "./PhotoHolder";
import { iPhoto } from "./types/photo";

const Wrapper = styled.div`
  margin-top: 20px;
  width: 70%;
`;

const Header = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const Error = styled.div`
  background-color: ${({ theme }) => theme.red};
  padding: 5px;
  color: white;
  font-size: 12px;
  margin-top: 5px;
  user-select: none;
`;

const Photo = ({ image, imageError, setImage, setImageError }: iPhoto) => {
  return (
    <Wrapper>
      <Header>Dodaj zdjęcie</Header>
      <PhotoHolder
        image={image}
        setImage={setImage}
        setImageError={setImageError}
      />
      {imageError && <Error>{imageError}</Error>}
    </Wrapper>
  );
};

export default Photo;
