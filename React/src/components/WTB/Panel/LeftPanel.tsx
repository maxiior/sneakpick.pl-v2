import React from "react";
import List from "components/WTB/List";
import GridList from "components/WTB/GridList";
import ColorwayGrid from "components/WTB/ColorwayGrid";
import styled from "styled-components";
import { useAppSelector } from "hooks/useAppSelector";
import { SNEAKERS_CATEGORIES, FIT_CATEGORIES } from "constants/categories";

const StyledLeftPanel = styled.div`
  overflow-y: auto;
  height: 100%;
  width: 250px;
  background-color: ${({ theme }) => theme.white};
  position: absolute;
  user-select: none;
  border-right: 1px solid ${({ theme }) => theme.lightGrey};
  box-sizing: border-box;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.grey};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.blue};
  }

  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const LeftPanel: React.FC = () => {
  const { currentFilters, filterTypes, filters } = useAppSelector(
    (state) => state.filtersSlice
  );

  return (
    <StyledLeftPanel>
      <List
        name="Kategoria"
        elements={filters.categories}
        filterType={filterTypes.category}
        currentFilter={currentFilters.category}
      />
      <List
        name="Marka"
        elements={filters.brands}
        filterType={filterTypes.brand}
        currentFilter={currentFilters.brand}
      />
      <GridList
        name="Rodzaj"
        elements={filters.types}
        filterType={filterTypes.kind}
        currentFilter={currentFilters.kind}
        medium
      />
      <GridList
        name="Stan"
        elements={filters.conditions}
        filterType={filterTypes.condition}
        currentFilter={currentFilters.condition}
        small
      />
      {SNEAKERS_CATEGORIES.includes(currentFilters.category) ? (
        <GridList
          name="Rozmiar"
          elements={filters.shoesSizes}
          filterType={filterTypes.shoesSize}
          currentFilter={currentFilters.shoesSize}
          small
        />
      ) : FIT_CATEGORIES.includes(currentFilters.category) ? (
        <GridList
          name="Rozmiar"
          elements={filters.clothesSizes}
          filterType={filterTypes.clotheSize}
          currentFilter={currentFilters.clotheSize}
          small
        />
      ) : (
        <></>
      )}
      {FIT_CATEGORIES.includes(currentFilters.category) && (
        <GridList
          name="Fit"
          elements={filters.fits}
          filterType={filterTypes.fit}
          currentFilter={currentFilters.fit}
          large
        />
      )}
      <ColorwayGrid
        colors={filters.colorways}
        filterType={filterTypes.colorway}
        currentFilter={currentFilters.colorway}
      />
    </StyledLeftPanel>
  );
};

export default LeftPanel;
