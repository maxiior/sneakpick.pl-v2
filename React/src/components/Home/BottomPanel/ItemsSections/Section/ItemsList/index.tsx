import ItemsLoadingScreen from "./ItemsLoadingScreen";
import Grid from "@material-ui/core/Grid";
import Item from "./Item";
import { iItem } from "types/item";
import { Wrapper, Container } from "./styled";

const ItemsList = ({
  items,
  pending,
}: {
  items: iItem[];
  pending: boolean;
}) => {
  return (
    <Wrapper>
      <Container>
        <Grid container spacing={2}>
          {pending ? (
            <ItemsLoadingScreen />
          ) : (
            <>
              {items.map((e) => (
                <Item key={e.id} data={e} />
              ))}
            </>
          )}
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default ItemsList;
