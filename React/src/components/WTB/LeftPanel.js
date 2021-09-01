import React from "react";
import List from "components/WTB/List";
import GridList from "components/WTB/GridList";
import ColorwayGrid from "components/WTB/ColorwayGrid";
import styled from "styled-components";
import { connect } from "react-redux";

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

const LeftPanel = ({ filters, filterTypes, currentFilters }) => {
  return (
    <StyledLeftPanel>
      <List
        name="Kategoria"
        elements={filters.categories}
        filterType={filterTypes.categories}
        currentFilter={currentFilters.categories}
        radio
      />
      <List
        name="Marka"
        elements={filters.brands}
        filterType={filterTypes.brands}
        currentFilter={currentFilters.brands}
      />
      <GridList
        name="Rodzaj"
        elements={filters.types}
        filterType={filterTypes.types}
        currentFilter={currentFilters.types}
        medium
      />
      <GridList
        name="Stan"
        elements={filters.conditions}
        filterType={filterTypes.conditions}
        currentFilter={currentFilters.conditions}
        small
      />
      <GridList
        name="Rozmiar"
        elements={filters.shoesSizes}
        filterType={filterTypes.shoesSizes}
        currentFilter={currentFilters.shoesSizes}
        small
      />
      <GridList
        name="Rozmiar"
        elements={filters.clothesSizes}
        filterType={filterTypes.clothesSizes}
        currentFilter={currentFilters.clothesSizes}
        small
      />
      <GridList
        name="Fit"
        elements={filters.fits}
        filterType={filterTypes.fits}
        currentFilter={currentFilters.fits}
        large
      />
      <ColorwayGrid
        colors={filters.colors}
        filterType={filterTypes.colors}
        currentFilter={currentFilters.colors}
      />
    </StyledLeftPanel>
  );
};

const mapStateToProps = ({ filtersReducer }) => {
  return {
    filterTypes: filtersReducer.filterTypes,
    filters: filtersReducer.filters,
    currentFilters: filtersReducer.currentFilters,
  };
};

export default connect(mapStateToProps)(LeftPanel);
