import React, { useEffect } from "react";
import styled from "styled-components";
import Feature from "components/WTS/Feature";
import GridList from "components/WTS/GridList";
import ColorwayGrid from "components/WTS/ColorwayGrid";
import Description from "components/WTS/Description";
import Delivery from "components/WTS/Delivery";
import { connect } from "react-redux";
import axiosInstance from "axios/axios";
import { resetCurrentStates as resetCurrentStatesAction } from "actions/WTS";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  user-select: none;
`;

const Container = styled.div`
  width: 60%;
  padding: 30px 0;
`;

const Header = styled.div`
  font-size: 35px;
  border-bottom: 1px solid ${({ theme }) => theme.black};
  font-weight: 500;
`;

const Panel = styled.div`
  margin-left: 25px;
`;

const Add = styled.div`
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 50px;

  :hover {
    opacity: 0.9;
  }
`;

const WTS = ({ filters, filterTypes, currentFilter, resetCurrentStates }) => {
  let history = useHistory();

  useEffect(() => {
    resetCurrentStates();
  }, []);

  const addingProcess = () => {
    axiosInstance
      .post("", {
        name: currentFilter.name,
        brand: currentFilter.brands,
        category: currentFilter.categories,
        description: currentFilter.description,
        kind: currentFilter.types,
        condition: currentFilter.conditions,
        size: `${
          currentFilter.categories === "Sneakersy"
            ? currentFilter.shoesSizes
            : currentFilter.clothesSizes
        }`,
        fit: currentFilter.fits,
        colorway: currentFilter.colors,
        price: currentFilter.price,
        ship: currentFilter.SHIP,
        meet: currentFilter.MEET,
      })
      .then((response) => {
        if (response.status === 201) history.push({ pathname: "/wtb/" });
      })
      .catch((error) => {});
  };

  return (
    <Wrapper>
      <Container>
        <Header>WANT TO SELL</Header>
        <Panel>
          <Feature
            name="Nazwa przedmiotu"
            placeholder="np. Nike Air Max 97"
            filterType="name"
            value={currentFilter.name}
          />
          <Feature
            name="Marka"
            placeholder="np. Nike"
            elements={filters.brands}
            filterType={filterTypes.brands}
            autocomplete
          />
          <Feature
            name="Kategoria"
            placeholder="np. Teesy"
            elements={filters.categories}
            filterType={filterTypes.categories}
            combobox
          />
          <Description
            name="Opis"
            placeholder="Opis"
            filterType="description"
          />
          <GridList
            title="Rodzaj"
            name="types"
            elements={filters.types}
            filterType={filterTypes.types}
            medium
          />
          <GridList
            title="Stan"
            name="condition"
            elements={filters.conditions}
            filterType={filterTypes.conditions}
            small
          />
          {currentFilter.categories === "Sneakersy" && (
            <GridList
              title="Rozmiar"
              name="shoesSizes"
              elements={filters.shoesSizes}
              filterType={filterTypes.shoesSizes}
              currentFilter={currentFilter.shoesSizes}
              small
            />
          )}
          {currentFilter.categories !== "Sneakersy" &&
            currentFilter.categories !== "placeholder" && (
              <>
                <GridList
                  title="Rozmiar"
                  name="clothesSizes"
                  elements={filters.clothesSizes}
                  filterType={filterTypes.clothesSizes}
                  currentFilter={currentFilter.clothesSizes}
                  small
                />
                <GridList
                  title="Fit"
                  name="fits"
                  elements={filters.fits}
                  filterType={filterTypes.fits}
                  currentFilter={currentFilter.fits}
                  medium
                />
              </>
            )}
          <ColorwayGrid
            colors={filters.colors}
            filterType={filterTypes.colors}
          />
          <Feature
            name="Cena"
            placeholder="0.00 PLN"
            filterType="price"
            number
          />
          <Delivery
            defaultValue="Warszawa"
            ship={currentFilter.SHIP}
            meet={currentFilter.MEET}
          />
        </Panel>
        <Add onClick={() => addingProcess()}>Dodaj ogłoszenie</Add>
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = ({ addingItemReducer }) => {
  return {
    filters: addingItemReducer.filters,
    filterTypes: addingItemReducer.filterTypes,
    currentFilter: addingItemReducer.currentFilters,
  };
};

const mapDispatchToProps = (dispatch) => ({
  resetCurrentStates: (filterType, id, input) =>
    dispatch(resetCurrentStatesAction(filterType, id, input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WTS);
