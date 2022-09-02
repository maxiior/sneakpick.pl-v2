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
  const rows = [];
  for (let i = 0; i < 12; i++) rows.push(<SingleItem key={i} />);

  return (
    <Wrapper>
      <Grid container spacing={2}>
        {rows}
      </Grid>
    </Wrapper>
  );
};

export default ItemsLoadingScreen;
