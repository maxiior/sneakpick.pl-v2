import { useState, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import List from "components/WTB/List";
import GridList from "components/WTB/GridList";
import ColorwayGrid from "components/WTB/ColorwayGrid";
import { IoMdClose } from "react-icons/io";
import { closeMobileFilters } from "store/interface/actions";
import { useDispatch, useSelector } from "react-redux";
import { resetAllStates } from "store/filters/actions";
import useResizeObserver from "@react-hook/resize-observer";
import { useScrollToTop } from "hooks/useScrollToTop";
import { useHistory } from "react-router-dom";
import { onResetFilters } from "functions/onResetFilters";
import { displayCommunicatorIcon } from "store/interface/actions";
import InputRange from "components/WTB/InputRange";
import { SNEAKERS_CATEGORIES, FIT_CATEGORIES } from "constants/categories";

const Wrapper = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  width: 100%;
  position: fixed;
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

  @media only screen and (min-width: ${({ theme }) => theme.min_width_LG}) {
    display: none;
  }
`;

const Header = styled.div`
  width: 100%;
  font-size: 30px;
  display: flex;
  justify-content: center;
  padding: 10px 24px;
  position: relative;
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
  justify-content: center;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  right: 20px;
  position: absolute;
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

const MobileFilters = ({ className }) => {
  const target = useRef(null);
  const size = useSize(target);
  const dispatch = useDispatch();
  const { filters, filterTypes, currentFilters } = useSelector(
    (state) => state.filtersSlice
  );
  const history = useHistory();

  useScrollToTop();

  if (size?.width === 0) {
    dispatch(closeMobileFilters());
    dispatch(displayCommunicatorIcon());
  }

  return (
    <Wrapper className={className} ref={target}>
      <Header>
        <Title>
          <div>Filtry</div>
        </Title>
        <Icon
          onClick={() => {
            dispatch(closeMobileFilters());
            dispatch(displayCommunicatorIcon());
          }}
        >
          <Close />
        </Icon>
      </Header>
      <InputRange
        filterType={filterTypes.price}
        currentFilter={currentFilters.price}
        mobile
      />
      <List
        name="Kategoria"
        elements={filters.categories}
        filterType={filterTypes.category}
        currentFilter={currentFilters.category}
        radio
        mobile
      />
      <List
        name="Marka"
        elements={filters.brands}
        filterType={filterTypes.brand}
        currentFilter={currentFilters.brand}
        mobile
      />
      <GridList
        name="Rodzaj"
        elements={filters.types}
        filterType={filterTypes.kind}
        currentFilter={currentFilters.kind}
        mobile
        large
      />
      <GridList
        name="Stan"
        elements={filters.conditions}
        filterType={filterTypes.condition}
        currentFilter={currentFilters.condition}
        mobile
        large
      />
      {SNEAKERS_CATEGORIES.includes(currentFilters.category) ? (
        <GridList
          name="Rozmiar"
          elements={filters.shoesSizes}
          filterType={filterTypes.shoesSize}
          currentFilter={currentFilters.shoesSize}
          mobile
          medium
        />
      ) : FIT_CATEGORIES.includes(currentFilters.category) ? (
        <GridList
          name="Rozmiar"
          elements={filters.clothesSizes}
          filterType={filterTypes.clotheSize}
          currentFilter={currentFilters.clotheSize}
          mobile
          medium
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
          mobile
          large
        />
      )}
      <ColorwayGrid
        colors={filters.colorways}
        filterType={filterTypes.colorway}
        currentFilter={currentFilters.colorway}
        mobile
        borderNone
      />
      <Container>
        <Button
          onClick={() => {
            dispatch(resetAllStates());
            onResetFilters(history);
          }}
          clear
        >
          Reset
        </Button>
        <Button
          onClick={() => {
            dispatch(closeMobileFilters());
            dispatch(displayCommunicatorIcon());
          }}
        >
          Zatwierdź
        </Button>
      </Container>
    </Wrapper>
  );
};

export default MobileFilters;
