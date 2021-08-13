import React, { useState } from "react";
import styled from "styled-components";
import Feature from "components/WTS/Feature";
import GridList from "components/WTS/GridList";
import ColorwayGrid from "components/WTS/ColorwayGrid";
import Description from "components/WTS/Description";
import Delivery from "components/WTS/Delivery";
import { connect } from "react-redux";

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
  color: ${({ theme }) => theme.white};
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 50px;

  :hover {
    opacity: 0.9;
  }
`;

const WTS = ({ filters }) => {
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
          <GridList name="Rodzaj" elements={filters.types} medium />
          <GridList name="Stan" elements={filters.conditions} small />
          <GridList name="Rozmiar" elements={filters.shoesSizes} small />
          <GridList name="Rozmiar" elements={filters.clothesSizes} small />
          <GridList name="Fit" elements={filters.fits} medium />
          <ColorwayGrid colors={filters.colors} />
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

const mapStateToProps = ({ filtersReducer }) => {
  return { filters: filtersReducer.filters };
};

export default connect(mapStateToProps)(WTS);
