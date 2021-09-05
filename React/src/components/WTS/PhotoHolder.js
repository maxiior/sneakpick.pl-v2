import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { FiCamera } from "react-icons/fi";

const Photo = styled.div`
  padding-top: 20%;
  padding-bottom: 20%;
  background-color: ${({ theme }) => theme.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.blue};
  }
`;

const Icon = styled(FiCamera)`
  font-size: 50px;
  color: ${({ theme }) => theme.white};
`;

const PhotoHolder = () => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
      <Photo>
        <Icon />
      </Photo>
    </Grid>
  );
};

export default PhotoHolder;
