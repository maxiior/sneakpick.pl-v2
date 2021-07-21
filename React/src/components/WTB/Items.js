import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import SingleItem from "components/WTB/SingleItem";
import fila from "components/WTB/pictures/fila.jpg";
import fila2 from "components/WTB/pictures/fila2.jpg";
import { connect } from "react-redux";

const StyledItems = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
`;

const Items = ({ items }) => {
  return (
    <StyledItems>
      <Grid container spacing={2}>
        {items.map((announ) => (
          <SingleItem
            key={announ.id}
            photo={fila}
            name={announ.name}
            price={announ.price}
            state={announ.state}
          />
        ))}
      </Grid>
    </StyledItems>
  );
};

const mapStateToProps = ({ items }) => ({ items });

export default connect(mapStateToProps)(Items);
