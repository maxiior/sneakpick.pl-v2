import React from "react";
import styled, { css } from "styled-components";
import Grid from "@material-ui/core/Grid";
import { VscChevronRight } from "react-icons/vsc";

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
  box-sizing: border-box;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.lightGrey};
  cursor: pointer;
  object-fit: cover;
  padding-bottom: 100%;
  resize: horizontal;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Photo = styled.div`
  border: 1px solid ${({ theme }) => theme.lightGrey};
  width: 100%;
  object-fit: cover;
  padding-bottom: 75%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
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
    opacity: 0.9;
  }

  ${({ left }) =>
    left &&
    css`
      transform: rotate(180deg);
      left: -45px;
    `}
`;

//   var photos = [];
//   for (var i = 4 - announ.images.length; i > 0; i--) {
//     photos.push(
//       <Grid item xs={3} sm={3} lg={3} xl={3} key={i}>
//         <IconPhoto></IconPhoto>
//       </Grid>
//     );
//   }

const Image = ({ photo }) => {
  return (
    <Wrapper>
      <MainPhoto>
        <Photo
        //   style={{
        //     backgroundImage: `url(${getPhoto(
        //       announ.images[current].file_name
        //     )})`,
        //   }}
        ></Photo>
        <StyledArrow left />
        <StyledArrow />
      </MainPhoto>
      <PhotosList>
        <Grid container spacing={1}>
          {/* {announ.images.map((m, i) => ( */}
          <Grid item xs={2} sm={2} lg={2} xl={2}>
            <IconPhoto
            // style={{
            //   backgroundImage: `url(${getPhoto(m.file_name)})`,
            //   borderBottom: `${
            //     current === i ? "3px solid #119e55" : "1px solid #ddd"
            //   }`,
            // }}
            // onClick={() => {
            //   setCurrent(i);
            // }}
            ></IconPhoto>
          </Grid>
          <Grid item xs={2} sm={2} lg={2} xl={2}>
            <IconPhoto
            // style={{
            //   backgroundImage: `url(${getPhoto(m.file_name)})`,
            //   borderBottom: `${
            //     current === i ? "3px solid #119e55" : "1px solid #ddd"
            //   }`,
            // }}
            // onClick={() => {
            //   setCurrent(i);
            // }}
            ></IconPhoto>
          </Grid>
          <Grid item xs={2} sm={2} lg={2} xl={2}>
            <IconPhoto
            // style={{
            //   backgroundImage: `url(${getPhoto(m.file_name)})`,
            //   borderBottom: `${
            //     current === i ? "3px solid #119e55" : "1px solid #ddd"
            //   }`,
            // }}
            // onClick={() => {
            //   setCurrent(i);
            // }}
            ></IconPhoto>
          </Grid>
          <Grid item xs={2} sm={2} lg={2} xl={2}>
            <IconPhoto
            // style={{
            //   backgroundImage: `url(${getPhoto(m.file_name)})`,
            //   borderBottom: `${
            //     current === i ? "3px solid #119e55" : "1px solid #ddd"
            //   }`,
            // }}
            // onClick={() => {
            //   setCurrent(i);
            // }}
            ></IconPhoto>
          </Grid>
          <Grid item xs={2} sm={2} lg={2} xl={2}>
            <IconPhoto
            // style={{
            //   backgroundImage: `url(${getPhoto(m.file_name)})`,
            //   borderBottom: `${
            //     current === i ? "3px solid #119e55" : "1px solid #ddd"
            //   }`,
            // }}
            // onClick={() => {
            //   setCurrent(i);
            // }}
            ></IconPhoto>
          </Grid>
          <Grid item xs={2} sm={2} lg={2} xl={2}>
            <IconPhoto
            // style={{
            //   backgroundImage: `url(${getPhoto(m.file_name)})`,
            //   borderBottom: `${
            //     current === i ? "3px solid #119e55" : "1px solid #ddd"
            //   }`,
            // }}
            // onClick={() => {
            //   setCurrent(i);
            // }}
            ></IconPhoto>
          </Grid>
          {/* ))} */}
        </Grid>
      </PhotosList>
    </Wrapper>
  );
};

export default Image;
