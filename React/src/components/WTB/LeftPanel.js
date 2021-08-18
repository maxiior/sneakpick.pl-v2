import React, { useState } from "react";
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

const LeftPanel = ({ filters, filterTypes }) => {
  return (
    <StyledLeftPanel>
      <List
        name="Kategoria"
        elements={filters.categories}
        filterType={filterTypes.categories}
        radio="category"
      />
      <List
        name="Marka"
        elements={filters.brands}
        filterType={filterTypes.brands}
      />
      <GridList
        name="Rodzaj"
        elements={filters.types}
        filterType={filterTypes.types}
        medium
      />
      <GridList
        name="Stan"
        elements={filters.conditions}
        filterType={filterTypes.conditions}
        small
      />
      <GridList
        name="Rozmiar"
        elements={filters.shoesSizes}
        filterType={filterTypes.shoesSizes}
        small
      />
      <GridList
        name="Rozmiar"
        elements={filters.clothesSizes}
        filterType={filterTypes.clothesSizes}
        small
      />
      <GridList
        name="Fit"
        elements={filters.fits}
        filterType={filterTypes.fits}
        large
      />
      <ColorwayGrid colors={filters.colors} filterType={filterTypes.colors} />
    </StyledLeftPanel>
  );
};

const mapStateToProps = ({ filtersReducer }) => {
  return {
    filterTypes: filtersReducer.filterTypes,
    filters: filtersReducer.filters,
  };
};

export default connect(mapStateToProps)(LeftPanel);
