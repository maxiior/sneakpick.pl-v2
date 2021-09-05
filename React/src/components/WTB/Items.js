import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import SingleItem from "components/WTB/SingleItem";
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
        {items.map((item) => (
          <SingleItem
            key={item.id}
            photo={item.images}
            name={item.name}
            price={item.price}
            state={item.condition}
            id={item.id}
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
