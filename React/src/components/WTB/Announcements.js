import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import SingleAnnoun from "components/WTB/SingleAnnoun";
import fila from "components/WTB/fila.jpg";
import fila2 from "components/WTB/fila2.jpg";

const StyledAnnouncements = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 40px 40px 80px 40px;
`;

const Announcements = () => {
  return (
    <StyledAnnouncements>
      <Grid container spacing={2}>
        <SingleAnnoun photo={fila} />
        <SingleAnnoun photo={fila2} />
        <SingleAnnoun photo={fila} />
        <SingleAnnoun photo={fila2} />
        <SingleAnnoun photo={fila} />
        <SingleAnnoun photo={fila2} />
        <SingleAnnoun photo={fila} />
        <SingleAnnoun photo={fila2} />
        <SingleAnnoun photo={fila} />
        <SingleAnnoun photo={fila2} />
        <SingleAnnoun photo={fila} />
        <SingleAnnoun photo={fila2} />
        <SingleAnnoun photo={fila} />
        <SingleAnnoun photo={fila2} />
        <SingleAnnoun photo={fila} />
        <SingleAnnoun photo={fila2} />
        <SingleAnnoun photo={fila} />
        <SingleAnnoun photo={fila2} />
        <SingleAnnoun photo={fila} />
        <SingleAnnoun photo={fila2} />
        <SingleAnnoun photo={fila} />
        <SingleAnnoun photo={fila2} />
        <SingleAnnoun photo={fila} />
        <SingleAnnoun photo={fila2} />
      </Grid>
    </StyledAnnouncements>
  );
};

export default Announcements;
