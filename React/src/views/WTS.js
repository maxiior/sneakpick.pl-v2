import React, { useState } from "react";
import styled from "styled-components";
import Feature from "components/WTS/Feature";
import GridList from "components/WTS/GridList";
import ColorwayGrid from "components/WTS/ColorwayGrid";
import Description from "components/WTS/Description";
import Delivery from "components/WTS/Delivery";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
  color: white;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 50px;

  :hover {
    opacity: 0.9;
  }
`;

const WTS = () => {
  const [types, setTypes] = useState([
    { text: "MĘSKI", checked: false },
    { text: "DAMSKI", checked: false },
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

  const [states, setState] = useState([
    { text: "DS", checked: false },
    { text: "VNDS", checked: false },
    { text: "4/5", checked: false },
    { text: "3/5", checked: false },
    { text: "2/5", checked: false },
    { text: "1/5", checked: false },
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

  const [showCity, setShowCity] = useState(false);

  return (
    <Wrapper>
      <Container>
        <Header>WANT TO SELL</Header>
        <Panel>
          <Feature name="Nazwa przedmiotu" placeholder="np. Nike Air Max 97" />
          <Feature name="Marka" placeholder="np. Nike" />
          <Feature name="Kategoria" placeholder="np. Teesy" />
          <Description name="Opis" placeholder="Opis" />
          <GridList name="Rodzaj" elements={types} medium />
          <GridList name="Stan" elements={states} small />
          <GridList name="Rozmiar" elements={sizes} small />
          <GridList name="Rozmiar" elements={sizes2} small />
          <GridList name="Fit" elements={fits} medium />
          <ColorwayGrid colors={colors} />
          <Feature name="Cena" placeholder="0.00 PLN" />
          <Delivery
            defaultValue="Warszawa"
            checkbox={showCity}
            setCheckbox={setShowCity}
          />
        </Panel>
        <Add>Dodaj ogłoszenie</Add>
      </Container>
    </Wrapper>
  );
};

export default WTS;
