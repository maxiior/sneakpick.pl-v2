import styled from "styled-components";
import useAuthenticated from "hooks/useAuthenticated";
import SingleItem from "components/common/SingleItem";
import PagesList from "components/WTB/PagesList";
import { useAppSelector } from "hooks/useAppSelector";
import { Link } from "react-router-dom";
import { routes } from "routes";
import Grid from "@material-ui/core/Grid";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  user-select: none;
  padding: 30px 0;
  background-color: ${({ theme }) => theme.white};
`;

const Header = styled.div`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 5vw;
  }
`;

const Panel = styled.div``;

const Container = styled.div`
  width: 60%;
`;

const StyledPagesList = styled(PagesList)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Results = styled.div`
  margin-bottom: 15px;
`;

const Blank = styled.div`
  font-size: 25px;
  margin-top: 80px;
  text-align: center;
`;

const Holder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;

const Button = styled(Link)`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  padding: 15px;
  cursor: pointer;
  border-radius: 10px;
  text-decoration: none;
  font-size: 14px;
`;

const Followed = () => {
  useAuthenticated();
  const { items, results } = useAppSelector((state) => state.followedSlice);

  return (
    <Wrapper>
      <Container>
        <Header>Przedmioty, które obserwujesz</Header>
        <Results>Liczba obserwowanych: {results}</Results>
        <Panel>
          {results > 0 ? (
            <Grid container spacing={2}>
              {items.map((e) => (
                <SingleItem data={e} />
              ))}
            </Grid>
          ) : (
            <Blank>
              Aktualnie nie posiadasz żadnych zaobserwowanych przedmiotów.
            </Blank>
          )}
          <Holder>
            <Button to={routes.WTB + routes.DEFAULT_SEARCH}>
              Wróć do zakupów
            </Button>
          </Holder>
        </Panel>
        {results > 24 && <StyledPagesList />}
      </Container>
    </Wrapper>
  );
};

export default Followed;
