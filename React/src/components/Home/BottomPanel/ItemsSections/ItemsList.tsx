import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import Item from "components/Home/BottomPanel/ItemsSections/Item";
import { iItem } from "types/item";

const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  user-select: none;

  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.grey};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.blue};
  }
`;

const Container = styled.div`
  min-width: 1270px;
  max-width: calc(100% - 8px);
  padding-bottom: 10px;

  @media only screen and (max-width: 589px) {
    min-width: 980px;
  }
`;

const ItemsList = ({ items }: { items: iItem[] }) => {
  return (
    <Wrapper>
      <Container>
        <Grid container spacing={2}>
          {items.map((e) => (
            <Item key={e.id} data={e} />
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default ItemsList;
