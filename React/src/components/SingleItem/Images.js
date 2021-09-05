import React, { useState } from "react";
import styled, { css } from "styled-components";
import Grid from "@material-ui/core/Grid";
import { VscChevronRight } from "react-icons/vsc";
import { routes, endpoints } from "routes";

const Wrapper = styled.div`
  width: 85%;
`;

const MainPhoto = styled.div`
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

const PhotosList = styled.div`
  padding-top: 10px;
`;

const IconPhoto = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.lightGrey};
  cursor: pointer;
  object-fit: cover;
  padding-bottom: 100%;
  resize: horizontal;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;

  border-bottom: ${({ highlight, theme }) =>
    highlight && `4px solid ${theme.blue}`};
`;

const Photo = styled.div`
  border: 1px solid ${({ theme }) => theme.lightGrey};
  width: 100%;
  object-fit: cover;
  padding-bottom: 75%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const StyledArrow = styled(VscChevronRight)`
  position: absolute;
  top: 50%;
  margin-top: -20px;
  font-size: 50px;
  right: -45px;
  cursor: pointer;
  color: ${({ theme }) => theme.veryDarkGrey};

  :hover {
    color: ${({ theme }) => theme.blue};
  }

  ${({ left }) =>
    left &&
    css`
      transform: rotate(180deg);
      left: -45px;
    `}
`;

const Images = ({ images }) => {
  const getPhoto = (photo) => {
    return routes.DOMAIN + endpoints.IMAGES + photo;
  };

  const [current, setCurrent] = useState(0);
  var photos = [];

  for (var i = 6 - images?.length; i > 0; i--) {
    photos.push(
      <Grid item xs={2} sm={2} lg={2} xl={2} key={i}>
        <IconPhoto></IconPhoto>
      </Grid>
    );
  }

  return (
    <Wrapper>
      <MainPhoto>
        <Photo
          style={{
            backgroundImage: `url(${
              images !== undefined && getPhoto(images[current].file_name)
            })`,
          }}
        ></Photo>
        <StyledArrow
          left
          onClick={() => {
            if (current > 0) setCurrent(current - 1);
          }}
        />
        <StyledArrow
          onClick={() => {
            if (current < images?.length - 1) setCurrent(current + 1);
          }}
        />
      </MainPhoto>
      <PhotosList>
        <Grid container spacing={1}>
          {images?.map((e, i) => (
            <Grid item xs={2} sm={2} lg={2} xl={2}>
              <IconPhoto
                style={{
                  backgroundImage: `url(${getPhoto(e.file_name)})`,
                }}
                highlight={current === i}
                onClick={() => {
                  setCurrent(i);
                }}
              ></IconPhoto>
            </Grid>
          ))}
          {photos}
        </Grid>
      </PhotosList>
    </Wrapper>
  );
};

export default Images;
