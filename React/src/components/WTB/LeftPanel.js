import React, { useState } from "react";
import List from "components/WTB/List";
import GridList from "components/WTB/GridList";
import ColorwayGrid from "components/WTB/ColorwayGrid";
import styled from "styled-components";

const LeftPanel = () => {
  const [categories, setCategory] = useState([
    { text: "Sneakersy", checked: false },
    { text: "Hoodie", checked: false },
    { text: "Teesy", checked: false },
    { text: "Koszule", checked: false },
    { text: "Crewnecki", checked: false },
    { text: "Longsleevy", checked: false },
    { text: "Katany", checked: false },
    { text: "Kurtki", checked: false },
    { text: "Płaszcze", checked: false },
    { text: "Spodnie", checked: false },
    { text: "Szale", checked: false },
    { text: "Portfele", checked: false },
    { text: "Plecaki", checked: false },
    { text: "Zegarki", checked: false },
    { text: "Czapki", checked: false },
    { text: "Belty", checked: false },
    { text: "Bielizna", checked: false },
    { text: "Inne", checked: false },
  ]);

  const [brands, setBrand] = useState([
    { text: "Nike", checked: false },
    { text: "Adidas", checked: false },
    { text: "Supreme", checked: false },
    { text: "Puma", checked: false },
    { text: "New Balance", checked: false },
    { text: "Vans", checked: false },
    { text: "Louis Vuitton", checked: false },
    { text: "Palace", checked: false },
    { text: "Diadora", checked: false },
    { text: "Reebok", checked: false },
    { text: "Balenciaga", checked: false },
    { text: "Lacoste", checked: false },
    { text: "Yeezy", checked: false },
    { text: "Off-White", checked: false },
    { text: "Converse", checked: false },
    { text: "Stone Island", checked: false },
    { text: "The North Face", checked: false },
    { text: "Ralph Lauren", checked: false },
    { text: "Guess", checked: false },
    { text: "Tommy Hilfiger", checked: false },
    { text: "VLONE", checked: false },
    { text: "Inne", checked: false },
  ]);

  const [types, setType] = useState([
    { text: "MĘSKIE", checked: false },
    { text: "DAMSKIE", checked: false },
  ]);

  const [states, setState] = useState([
    { text: "DS", checked: false },
    { text: "VNDS", checked: false },
    { text: "4/5", checked: false },
    { text: "3/5", checked: false },
    { text: "2/5", checked: false },
    { text: "1/5", checked: false },
  ]);

  const [sizes, setSize] = useState([
    { text: "36.0", checked: false },
    { text: "36.5", checked: false },
    { text: "37.0", checked: false },
    { text: "37.5", checked: false },
    { text: "38.0", checked: false },
    { text: "38.5", checked: false },
    { text: "39.0", checked: false },
    { text: "39.5", checked: false },
    { text: "40.0", checked: false },
    { text: "40.5", checked: false },
    { text: "41.0", checked: false },
    { text: "41.5", checked: false },
    { text: "42.0", checked: false },
    { text: "42.5", checked: false },
    { text: "43.0", checked: false },
    { text: "43.5", checked: false },
    { text: "44.0", checked: false },
    { text: "44.5", checked: false },
    { text: "45.0", checked: false },
    { text: "45.5", checked: false },
    { text: "46.0", checked: false },
    { text: "46.5", checked: false },
    { text: "47.0", checked: false },
    { text: "47.5", checked: false },
    { text: "48.0", checked: false },
    { text: "48.5", checked: false },
    { text: "49.0", checked: false },
    { text: "49.5", checked: false },
    { text: "50.0", checked: false },
  ]);

  const [sizes2, setSize2] = useState([
    { text: "XXS", checked: false },
    { text: "XS", checked: false },
    { text: "S", checked: false },
    { text: "M", checked: false },
    { text: "L", checked: false },
    { text: "XL", checked: false },
    { text: "XXL", checked: false },
  ]);

  const [fits, setFit] = useState([
    { text: "SLIM FIT", checked: false },
    { text: "REGULAR", checked: false },
    { text: "OVERSIZE", checked: false },
  ]);

  const [colors, setColor] = useState([
    { text: "#A23A3A", checked: false },
    { text: "#F2324D", checked: false },
    { text: "#F4A523", checked: false },
    { text: "#F8E71B", checked: false },
    { text: "#7CD321", checked: false },
    { text: "#4CA3FD", checked: false },
    { text: "#8F12FF", checked: false },
    { text: "#EC94FF", checked: false },
    { text: "#000000", checked: false },
    { text: "#AAAAAA", checked: false },
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

  const chooseOption = (setChecked, elements, value) => {
    setChecked(
      elements.map((element) =>
        element.text === value
          ? { ...element, checked: !element.checked }
          : element
      )
    );
  };

  return (
    <StyledLeftPanel>
      <List
        name="Kategoria"
        elements={categories}
        setChecked={setCategory}
        onToggle={chooseOption}
      />
      <List
        name="Marka"
        elements={brands}
        setChecked={setBrand}
        onToggle={chooseOption}
      />
      <GridList
        name="Rodzaj"
        elements={types}
        setChecked={setType}
        onToggle={chooseOption}
        medium
      />
      <GridList
        name="Stan"
        elements={states}
        setChecked={setState}
        onToggle={chooseOption}
        small
      />
      <GridList
        name="Rozmiar"
        elements={sizes}
        setChecked={setSize}
        onToggle={chooseOption}
        small
      />
      <GridList
        name="Rozmiar"
        elements={sizes2}
        setChecked={setSize2}
        onToggle={chooseOption}
        small
      />
      <GridList
        name="Fit"
        elements={fits}
        setChecked={setFit}
        onToggle={chooseOption}
        large
      />
      <ColorwayGrid
        colors={colors}
        setChecked={setColor}
        onToggle={chooseOption}
      />
    </StyledLeftPanel>
  );
};

export default LeftPanel;
