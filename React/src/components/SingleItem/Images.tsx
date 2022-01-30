import { useState } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { VscChevronRight } from "react-icons/vsc";
import { getPhoto } from "functions/getPhoto";
import { iImage } from "types/image";

const Wrapper = styled.div`
  width: 85%;
`;

const Main = styled.div`
  padding-bottom: 80%;
  box-sizing: border-box;
  resize: horizontal;
  max-width: 100%;
  padding: 0;
  position: relative;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Photo = styled.div<{ photo: string }>`
  border: 1px solid ${({ theme }) => theme.lightGrey};
  width: 100%;
  object-fit: cover;
  padding-bottom: 75%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: ${({ photo }) => photo && `url(${getPhoto(photo)})`};
`;

const Arrow = styled(VscChevronRight)<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  margin-top: -20px;
  font-size: 50px;
  right: -45px;
  left: ${({ left }) => left && "-45px"};
  transform: ${({ left }) => left && "rotate(180deg)"};
  cursor: pointer;
  color: ${({ theme }) => theme.veryDarkGrey};

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const List = styled.div`
  padding-top: 10px;
`;

const IconPhoto = styled.div<{ highlight?: boolean; photo?: string }>`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.lightGrey};
  cursor: pointer;
  object-fit: cover;
  padding-bottom: 100%;
  resize: horizontal;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: ${({ photo }) => photo && `url(${getPhoto(photo)})`};

  border-bottom: ${({ theme, highlight }) =>
    highlight && `4px solid ${theme.blue}`};
`;

const Images = ({ images }: { images: iImage[] }) => {
  const [current, setCurrent] = useState(0);
  var photos = [];

  for (let i = 6 - images?.length; i > 0; i--) {
    photos.push(
      <Grid item xs={2} sm={2} lg={2} xl={2} key={i}>
        <IconPhoto />
      </Grid>
    );
  }

  return (
    <Wrapper>
      <Main>
        <Photo
          photo={images !== undefined ? images[current]?.file_name : ""}
        ></Photo>
        <Arrow
          left
          onClick={() => {
            if (current > 0) setCurrent(current - 1);
          }}
        />
        <Arrow
          onClick={() => {
            if (current < images?.length - 1) setCurrent(current + 1);
          }}
        />
      </Main>
      <List>
        <Grid container spacing={1}>
          {images?.map((e, i) => (
            <Grid item xs={2} sm={2} lg={2} xl={2}>
              <IconPhoto
                key={i}
                photo={e.file_name}
                highlight={current === i}
                onClick={() => setCurrent(i)}
              />
            </Grid>
          ))}
          {photos}
        </Grid>
      </List>
    </Wrapper>
  );
};

export default Images;
