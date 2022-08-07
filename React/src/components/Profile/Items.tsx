import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import SingleItem from "components/common/SingleItem";
import { useAppSelector } from "hooks/useAppSelector";
import { iItem } from "types/item";

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 0;
`;

const Blank = styled.div`
  text-align: center;
  font-size: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_XL}) {
    padding: 100px 0;
  }
`;

const Items = () => {
  const { items, items_results }: { items: iItem[]; items_results: number } =
    useAppSelector((state) => state.profileSlice);

  return (
    <Wrapper>
      <Grid container spacing={2}>
        {items.map((item) => (
          <SingleItem key={item.id} data={item} />
        ))}
      </Grid>
      {items_results === 0 && (
        <Blank>Ten użytkownik nie posiada żadnych itemów.</Blank>
      )}
    </Wrapper>
  );
};

export default Items;
