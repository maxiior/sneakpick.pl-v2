import useAuthenticated from "hooks/useAuthenticated";
import ItemsList from "components/Followed/ItemsList";
import { useAppSelector } from "hooks/useAppSelector";
import { Wrapper, Container, Header, Results, StyledPagesList } from "./styles";

const Followed = () => {
  useAuthenticated();
  const { items, results } = useAppSelector((state) => state.followedSlice);

  return (
    <Wrapper>
      <Container>
        <Header>Przedmioty, które obserwujesz</Header>
        <Results>Liczba obserwowanych: {results}</Results>
        <ItemsList items={items} results={results} />
        {results > 24 && <StyledPagesList />}
      </Container>
    </Wrapper>
  );
};

export default Followed;
