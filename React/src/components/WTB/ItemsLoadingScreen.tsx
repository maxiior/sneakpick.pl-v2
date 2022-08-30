import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import SingleItem from "components/WTB/SingleItem";

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
`;

const ItemsLoadingScreen = () => {
  return (
    <Wrapper>
      <Grid container spacing={2}>
        <SingleItem key={0} />
        <SingleItem key={1} />
        <SingleItem key={2} />
        <SingleItem key={3} />
        <SingleItem key={4} />
        <SingleItem key={5} />
        <SingleItem key={6} />
        <SingleItem key={7} />
        <SingleItem key={8} />
        <SingleItem key={9} />
        <SingleItem key={10} />
        <SingleItem key={11} />
      </Grid>
    </Wrapper>
  );
};

export default ItemsLoadingScreen;
