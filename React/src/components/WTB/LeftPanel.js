import React, { useState } from "react";
import List from "components/WTB/List";
import GridList from "components/WTB/GridList";
import ColorwayGrid from "components/WTB/ColorwayGrid";
import styled from "styled-components";

const LeftPanel = () => {
  const [categories, setCategory] = useState([
    { text: "Sneakersy" },
    { text: "Hoodie" },
    { text: "Teesy" },
    { text: "Koszule" },
    { text: "Crewnecki" },
    { text: "Longsleevy" },
    { text: "Katany" },
    { text: "Kurtki" },
    { text: "Płaszcze" },
    { text: "Spodnie" },
    { text: "Szale" },
    { text: "Portfele" },
    { text: "Plecaki" },
    { text: "Zegarki" },
    { text: "Czapki" },
    { text: "Belty" },
    { text: "Bielizna" },
  ]);

  const [brands, setBrand] = useState([
    { text: "Nike" },
    { text: "Adidas" },
    { text: "Supreme" },
    { text: "Puma" },
    { text: "New Balance" },
    { text: "Vans" },
    { text: "Louis Vuitton" },
    { text: "Palace" },
    { text: "Diadora" },
    { text: "Reebok" },
    { text: "Balenciaga" },
    { text: "Lacoste" },
    { text: "Yeezy" },
    { text: "Off-White" },
    { text: "Converse" },
    { text: "Stone Island" },
    { text: "The North Face" },
    { text: "Ralph Lauren" },
    { text: "Guess" },
    { text: "Tommy Hilfiger" },
    { text: "VLONE" },
  ]);

  const [types, setType] = useState([{ text: "MĘSKIE" }, { text: "DAMSKIE" }]);

  const [states, setState] = useState([
    { text: "DS" },
    { text: "VNDS" },
    { text: "4/5" },
    { text: "3/5" },
    { text: "2/5" },
    { text: "1/5" },
  ]);

  const [sizes, setSize] = useState([
    { text: "36.0" },
    { text: "36.5" },
    { text: "37.0" },
    { text: "37.5" },
    { text: "38.0" },
    { text: "38.5" },
    { text: "39.0" },
    { text: "39.5" },
    { text: "40.0" },
    { text: "40.5" },
    { text: "41.0" },
    { text: "41.5" },
    { text: "42.0" },
    { text: "42.5" },
    { text: "43.0" },
    { text: "43.5" },
    { text: "44.0" },
    { text: "44.5" },
    { text: "45.0" },
    { text: "45.5" },
    { text: "46.0" },
    { text: "46.5" },
    { text: "47.0" },
    { text: "47.5" },
    { text: "48.0" },
    { text: "48.5" },
    { text: "49.0" },
    { text: "49.5" },
    { text: "50.0" },
  ]);

  const [sizes2, setSize2] = useState([
    { text: "XXS" },
    { text: "XS" },
    { text: "S" },
    { text: "M" },
    { text: "L" },
    { text: "XL" },
    { text: "XXL" },
  ]);

  const [fits, setFit] = useState([
    { text: "SLIM FIT" },
    { text: "REGULAR" },
    { text: "OVERSIZE" },
  ]);

  const [colors, setColor] = useState([
    { text: "#A23A3A" },
    { text: "#F2324D" },
    { text: "#F4A523" },
    { text: "#F8E71B" },
    { text: "#7CD321" },
    { text: "#4CA3FD" },
    { text: "#8F12FF" },
    { text: "#EC94FF" },
    { text: "#000000" },
    { text: "#AAAAAA" },
  ]);

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

  return (
    <StyledLeftPanel>
      <List name="Kategoria" elements={categories} />
      <List name="Marka" elements={brands} />
      <GridList name="Rodzaj" elements={types} medium />
      <GridList name="Stan" elements={states} small />
      <GridList name="Rozmiar" elements={sizes} small />
      <GridList name="Rozmiar" elements={sizes2} small />
      <GridList name="Fit" elements={fits} large />
      <ColorwayGrid colors={colors} />
    </StyledLeftPanel>
  );
};

export default LeftPanel;
