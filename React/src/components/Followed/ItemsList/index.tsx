import Grid from "@material-ui/core/Grid";
import SingleItem from "components/common/SingleItem";
import { routes } from "routes";
import { Text, Holder, Button } from "./styles";
import { iItemsList } from "./types";

const ItemsList = ({ items, results }: iItemsList) => {
  return (
    <div>
      {results > 0 ? (
        <Grid container spacing={2}>
          {items.map((e) => (
            <SingleItem key={e.id} data={e} />
          ))}
        </Grid>
      ) : (
        <>
          <Text>
            Aktualnie nie posiadasz żadnych zaobserwowanych przedmiotów.
          </Text>
          <Holder>
            <Button to={routes.WTB + routes.DEFAULT_SEARCH}>
              Wróć do zakupów
            </Button>
          </Holder>
        </>
      )}
    </div>
  );
};

export default ItemsList;
