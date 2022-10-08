import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { FiCamera } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { iPhotoHolder } from "./types/photoHolder";
import { ChangeEvent } from "react";

const Input = styled.input`
  display: none;
`;

const Icon = styled(FiCamera)<{ $isImage: boolean }>`
  font-size: 50px;
  color: ${({ theme }) => theme.white};
  visibility: ${({ $isImage }) => $isImage && "hidden"};

  @media only screen and (max-width: ${({ theme }) => theme.max_width_XL}) {
    font-size: 4vw;
  }
  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    font-size: 5vw;
  }
`;

const Photo = styled.label<{ image: any }>`
  padding-top: 20%;
  padding-bottom: 20%;
  background-color: ${({ theme }) => theme.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.radious_SM};
  cursor: pointer;
  height: 100%;
  width: 100%;

  background-image: url(${({ image }) => image});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  :hover {
    background-color: ${({ theme }) => theme.blue};
    filter: ${({ image }) => image && "brightness(50%)"};
  }
`;

const Remove = styled(IoTrashOutline)`
  border-radius: 50%;
  font-size: 35px;
  padding: 5px;
  background-color: ${({ theme }) => theme.white};
  position: absolute;
  cursor: pointer;
  display: none;
  z-index: 100;

  :hover + ${Photo} {
    filter: brightness(50%);
  }
`;

const Container = styled.div<{ $isImage: boolean }>`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover ${Remove} {
    ${({ $isImage }) => $isImage && "display: block"};
  }
`;

const PhotoHolder = ({
  index,
  images,
  setImagesError,
  setImages,
}: iPhotoHolder) => {
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      alert("Nie dodałeś plików!");
      return;
    }

    setImagesError(false);

    if (e.target.files.length + images.length > 6) {
      alert(
        `Dodanie ${e.target.files.length} zdjęć do ${images.length} już dodanych przekroczyłoby limit 6 plików.`
      );
      return;
    }
    const newImages: File[] = [...e.target.files!].map((file) => {
      return file;
    });
    setImages([...images, ...newImages]);
  };

  return (
    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
      <Container $isImage={images[index] !== undefined}>
        <Remove
          onClick={() => {
            setImages(images.filter((e, i) => i !== index));
            setImagesError(false);
          }}
        />
        <Photo
          image={
            images[index] !== undefined
              ? URL.createObjectURL(images[index])
              : undefined
          }
        >
          <Input
            name="photo"
            type="file"
            multiple
            onChange={(e) => handleFile(e)}
          />
          <Icon $isImage={images[index] !== undefined} />
        </Photo>
      </Container>
    </Grid>
  );
};

export default PhotoHolder;
