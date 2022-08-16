import FiltersHeader from "components/WTB/FiltersHeader";
import FiltersPanel from "components/WTB/FiltersPanel";
import PagesList from "components/WTB/PagesList";
import styled from "styled-components";
import Path from "components/WTB/Path";
import Results from "components/WTB/Results";
import ComboBox from "components/WTB/ComboBox";
import { useEffect } from "react";
import { changeSelector } from "store/selectors/actions";
import { useDispatch, useSelector } from "react-redux";
import { sortingModes } from "constants/sortingModes";
import { paginationModes } from "constants/paginationModes";

const Nav = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.white};
  font-size: 16px;
  user-select: none;
  border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
  box-sizing: border-box;

  @media only screen and (max-width: 1200px) {
    height: 100px;
  }
`;

const RightPanel = styled.div`
  padding-left: 250px;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;

  @media only screen and (min-width: 1201px) {
    height: 100%;
  }
  @media only screen and (max-width: 1200px) {
    justify-content: center;
    display: block;
  }
  @media only screen and (max-width: 992px) {
    padding: 0;
  }
`;

const StyledPath = styled(Path)`
  @media only screen and (max-width: 1200px) {
    display: flex;
    justify-content: center;
    margin: 0;
  }
`;

const StyledResults = styled(Results)`
  @media only screen and (max-width: 1200px) {
    display: flex;
    justify-content: center;
  }
`;

const StyledComboBox = styled(ComboBox)`
  @media only screen and (max-width: 1200px) {
    display: flex;
    justify-content: center;
  }
`;

const StyledPagesList = styled(PagesList)`
  @media only screen and (max-width: 1200px) {
    display: flex;
    justify-content: center;
    margin: 0;
    padding-top: 15px;
  }
`;

const Holder = styled.div`
  display: inline-block;
  @media only screen and (max-width: 1200px) {
    display: flex;
    justify-content: center;
  }
`;

const StyledFiltersPanel = styled(FiltersPanel)`
  @media only screen and (min-width: 993px) {
    display: none;
  }
`;

const TopNav = () => {
  const dispatch = useDispatch();
  const { page, pagination } = useSelector(
    (state) => state.selectorsSlice.currentSelectors
  );
  const { results } = useSelector((state) => state.itemsSlice);

  useEffect(() => {
    if (
      page > Math.ceil(results / pagination) &&
      Math.ceil(results / pagination) > 1
    ) {
      dispatch(
        changeSelector({
          type: "page",
          value: Math.ceil(results / pagination),
        })
      );
    }
  }, [pagination]);

  return (
    <>
      <StyledFiltersPanel />
      <Nav>
        <FiltersHeader />
        <RightPanel>
          <div>
            <Holder>
              <StyledPath />
              <StyledResults results={results} />
            </Holder>
            <Holder>
              <StyledComboBox
                selectorType="sorting"
                name="Sortowanie"
                elements={sortingModes}
                sorting
              />
              <StyledComboBox
                selectorType="pagination"
                name="Pokaż"
                elements={paginationModes}
              />
            </Holder>
          </div>
          {Math.ceil(results / pagination) > 1 && <StyledPagesList />}
        </RightPanel>
      </Nav>
    </>
  );
};

export default TopNav;
