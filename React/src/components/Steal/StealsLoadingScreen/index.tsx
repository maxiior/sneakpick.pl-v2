import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import DummyBox from "./DummyBox";

const Wrapper = styled.div`
  width: 100%;
`;

const StealsLoadingScreen = () => {
  const rows = [];
  for (let i = 0; i < 12; i++) rows.push(<DummyBox key={i} />);

  return (
    <Wrapper>
      <Grid container spacing={2}>
        {rows}
      </Grid>
    </Wrapper>
  );
};

export default StealsLoadingScreen;
