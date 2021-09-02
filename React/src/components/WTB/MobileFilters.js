import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import styled from "styled-components";
import List from "components/WTB/List";
import GridList from "components/WTB/GridList";
import ColorwayGrid from "components/WTB/ColorwayGrid";
import { connect } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { closeMobileFilters as closeMobileFiltersAction } from "actions/WTB";
import { resetAllStates as resetAllStatesAction } from "actions/filters";
import useResizeObserver from "@react-hook/resize-observer";

const Wrapper = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  width: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.white};
  z-index: 1000;
  top: 0;
  padding-bottom: 84px;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.grey};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.blue};
  }

  @media only screen and (min-width: 993px) {
    display: none;
  }
`;

const Header = styled.div`
  width: 100%;
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  padding: 10px 24px;
`;

const Close = styled(IoMdClose)`
  cursor: pointer;
  color: ${({ theme }) => theme.veryDarkGrey};

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  position: fixed;
  display: flex;
  bottom: 0;
  background-color: ${({ theme }) => theme.white};
  justify-content: space-between;
  padding: 10px 40px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

const Button = styled.div`
  width: 47%;
  text-align: center;
  background-color: ${({ theme, clear }) =>
    clear ? theme.blue : theme.veryDarkGrey};
  padding: 10px 0;
  color: ${({ theme }) => theme.white};
  font-size: 20px;
  cursor: pointer;
  user-select: none;

  :hover {
    opacity: 0.9;
  }
`;

const useSize = (target) => {
  const [size, setSize] = useState();

  useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

const MobileFilters = ({
  filterTypes,
  filters,
  className,
  closeMobileFilters,
  resetAllStates,
  currentFilters,
}) => {
  const target = useRef(null);
  const size = useSize(target);

  if (size?.width === 0) {
    closeMobileFilters();
  }

  return (
    <Wrapper className={className} ref={target}>
      <Header>
        <Title>Filtry</Title>
        <Icon onClick={() => closeMobileFilters()}>
          <Close />
        </Icon>
      </Header>
      <List
        name="Kategoria"
        elements={filters.categories}
        filterType={filterTypes.categories}
        currentFilter={currentFilters.categories}
        radio
        mobile
      />
      <List
        name="Marka"
        elements={filters.brands}
        filterType={filterTypes.brands}
        currentFilter={currentFilters.brands}
        mobile
      />
      <GridList
        name="Rodzaj"
        elements={filters.types}
        filterType={filterTypes.types}
        currentFilter={currentFilters.types}
        mobile
        large
      />
      <GridList
        name="Stan"
        elements={filters.conditions}
        filterType={filterTypes.conditions}
        currentFilter={currentFilters.conditions}
        mobile
        large
      />
      <GridList
        name="Rozmiar"
        elements={filters.shoesSizes}
        filterType={filterTypes.shoesSizes}
        currentFilter={currentFilters.shoesSizes}
        mobile
        medium
      />
      <GridList
        name="Rozmiar"
        elements={filters.clothesSizes}
        filterType={filterTypes.clothesSizes}
        currentFilter={currentFilters.clothesSizes}
        mobile
        medium
      />
      <GridList
        name="Fit"
        elements={filters.fits}
        filterType={filterTypes.fits}
        currentFilter={currentFilters.fits}
        mobile
        large
      />
      <ColorwayGrid
        colors={filters.colors}
        filterType={filterTypes.colors}
        currentFilter={currentFilters.colors}
        mobile
        borderNone
      />
      <Container>
        <Button onClick={() => resetAllStates()} clear>
          RESET
        </Button>
        <Button>ZATWIERDŹ</Button>
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = ({ filtersReducer }) => {
  return {
    filterTypes: filtersReducer.filterTypes,
    filters: filtersReducer.filters,
    currentFilters: filtersReducer.currentFilters,
  };
};

const mapDispatchToProps = (dispatch) => ({
  closeMobileFilters: () => dispatch(closeMobileFiltersAction()),
  resetAllStates: () => dispatch(resetAllStatesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileFilters);
