import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import SingleItem from "components/WTB/SingleItem";
import fila from "components/WTB/pictures/fila.jpg";
import fila2 from "components/WTB/pictures/fila2.jpg";
import { connect } from "react-redux";
import { fetchItems } from "actions/WTB";
import { useEffect } from "react";

const StyledItems = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
`;

const Items = ({ items, fetchItems }) => {
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <StyledItems>
      <Grid container spacing={2}>
        {items.map((announ) => (
          <SingleItem
            key={announ.id}
            photo={fila}
            name={announ.name}
            price={announ.price}
            state={announ.condition}
          />
        ))}
      </Grid>
    </StyledItems>
  );
};

const mapStateToProps = ({ announs }) => {
  return { items: announs.items };
};

const mapDispatchToProps = (dispatch) => ({
  fetchItems: () => dispatch(fetchItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
