import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import SingleItem from "components/Profile/SingleItem";
import { useSelector } from "react-redux";

const StyledItems = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 0;
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
  const selector = useSelector((state) => state.profileSlice);

  return (
    <StyledItems>
      <Grid container spacing={2}>
        {selector.items.map((item) => (
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
      {selector.results === 0 && (
        <Blank>Ten użytkownik nie posiada żadnych itemów.</Blank>
      )}
    </StyledItems>
  );
};

export default Items;
