import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import SingleItem from "components/WTB/SingleItem";
import fila from "components/WTB/pictures/fila.jpg";
import { connect } from "react-redux";

const StyledItems = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
`;

const Blank = styled.div`
  text-align: center;
  font-size: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Items = ({ items, results }) => {
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
            id={announ.id}
          />
        ))}
      </Grid>
      {results === 0 && (
        <Blank>Brak wyników wyszukiwania dla wprowadzonych danych.</Blank>
      )}
    </StyledItems>
  );
};

const mapStateToProps = ({ announsReducer }) => {
  return {
    results: announsReducer.results,
    items: announsReducer.items,
  };
};

export default connect(mapStateToProps)(Items);
