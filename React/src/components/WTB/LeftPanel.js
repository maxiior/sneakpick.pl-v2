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
  background-color: white;
  position: absolute;
  user-select: none;
  border-right: 1px solid #f0f0f0;
  box-sizing: border-box;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: #ddd;
  }

  ::-webkit-scrollbar-thumb {
    background: #00b4ff;
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const LeftPanel = ({
  categories,
  brands,
  types,
  conditions,
  shoesSizes,
  clothesSizes,
  fits,
  colors,
}) => {
  return (
    <StyledLeftPanel>
      <List name="Kategoria" elements={categories} />
      <List name="Marka" elements={brands} />
      <GridList name="Rodzaj" elements={types} medium />
      <GridList name="Stan" elements={conditions} small />
      <GridList name="Rozmiar" elements={shoesSizes} small />
      <GridList name="Rozmiar" elements={clothesSizes} small />
      <GridList name="Fit" elements={fits} large />
      <ColorwayGrid colors={colors} />
    </StyledLeftPanel>
  );
};

const mapStateToProps = ({ filters }) => {
  return {
    categories: filters.categories,
    brands: filters.brands,
    types: filters.types,
    conditions: filters.conditions,
    shoesSizes: filters.shoesSizes,
    clothesSizes: filters.clothesSizes,
    fits: filters.fits,
    colors: filters.colors,
  };
};

export default connect(mapStateToProps)(LeftPanel);
