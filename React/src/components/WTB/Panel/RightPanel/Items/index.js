import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import SingleItem from "components/WTB/common/SingleItem";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
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

const Items = () => {
  const { results, items } = useSelector((state) => state.itemsSlice);
  return (
    <Wrapper>
      <Grid container spacing={2}>
        {items.map((item) => (
          <SingleItem
            key={item.id}
            photo={item.images}
            name={item.name}
            price={item.price}
            state={item.condition}
            for_trade={item.for_trade}
            id={item.id}
          />
        ))}
      </Grid>
      {(results === 0 || items.length === 0) && (
        <Blank>Brak wyników wyszukiwania dla wprowadzonych danych.</Blank>
      )}
    </Wrapper>
  );
};

export default Items;
