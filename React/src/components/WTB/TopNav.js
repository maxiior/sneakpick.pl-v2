import FiltersHeader from "components/WTB/FiltersHeader";
import FiltersPanel from "components/WTB/FiltersPanel";
import PagesList from "components/WTB/PagesList";
import styled from "styled-components";
import Path from "components/WTB/Path";
import Results from "components/WTB/Results";
import ComboBox from "components/WTB/ComboBox";
import { connect } from "react-redux";
import { useEffect } from "react";
import { fetchItems } from "actions/WTB";
import { changeState } from "actions/itemsSelector";

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

const TopNav = ({
  steps,
  results,
  sortingModes,
  paginationModes,
  currentPage,
  currentPagination,
  fetchItems,
  changeState,
}) => {
  useEffect(() => {
    fetchItems(
      currentPagination,
      (currentPage - 1) * currentPagination,
      window.location.search
    );
  }, [currentPagination, currentPage]);

  useEffect(() => {
    if (
      currentPage > Math.ceil(results / currentPagination) &&
      Math.ceil(results / currentPagination) > 1
    ) {
      changeState("currentPage", Math.ceil(results / currentPagination));
    }
  }, [currentPagination]);

  return (
    <>
      <StyledFiltersPanel />
      <Nav>
        <FiltersHeader />
        <RightPanel>
          <div>
            <Holder>
              <StyledPath steps={steps} />
              <StyledResults results={results} />
            </Holder>
            <Holder>
              <StyledComboBox
                itemsSelectorType="currentSorting"
                name="Sortowanie"
                elements={sortingModes}
                sorting
              />
              <StyledComboBox
                itemsSelectorType="currentPagination"
                name="Pokaż"
                elements={paginationModes}
              />
            </Holder>
          </div>
          {Math.ceil(results / currentPagination) > 1 && <StyledPagesList />}
        </RightPanel>
      </Nav>
    </>
  );
};

const mapStateToProps = ({ itemsSelectorReducer, announsReducer }) => {
  return {
    results: announsReducer.results,
    sortingModes: itemsSelectorReducer.sortingModes,
    paginationModes: itemsSelectorReducer.paginationModes,
    currentPagination: itemsSelectorReducer.currentPagination,
    currentPage: itemsSelectorReducer.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchItems: (limit, offset, search) =>
    dispatch(fetchItems(limit, offset, search)),
  changeState: (itemsSelectorType, data) =>
    dispatch(changeState(itemsSelectorType, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
