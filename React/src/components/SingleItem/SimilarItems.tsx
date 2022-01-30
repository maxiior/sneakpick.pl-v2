import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { iItem } from "types/item";

const Wrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.lightGrey};
  margin-top: 30px;
`;

const Label = styled.div`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  padding: 10px 30px;
  width: 250px;
  text-align: center;
  margin-top: -1px;
  margin-bottom: 30px;
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

const SimilarItems = ({ items }: { items: iItem[] }) => {
  return (
    <Wrapper>
      <Label>Podobne itemy</Label>
      <Grid container spacing={1}>
        <Grid item xs={2} sm={2} lg={2} xl={2}>
          <IconPhoto></IconPhoto>
        </Grid>
        <Grid item xs={2} sm={2} lg={2} xl={2}>
          <IconPhoto></IconPhoto>
        </Grid>
        <Grid item xs={2} sm={2} lg={2} xl={2}>
          <IconPhoto></IconPhoto>
        </Grid>
        <Grid item xs={2} sm={2} lg={2} xl={2}>
          <IconPhoto></IconPhoto>
        </Grid>
        <Grid item xs={2} sm={2} lg={2} xl={2}>
          <IconPhoto></IconPhoto>
        </Grid>
        <Grid item xs={2} sm={2} lg={2} xl={2}>
          <IconPhoto></IconPhoto>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default SimilarItems;
