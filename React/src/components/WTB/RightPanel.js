import Itmes from "components/WTB/Items";
import PagesList from "components/WTB/PagesList";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledRightPanel = styled.div`
  display: block;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-left: 250px;
  background-color: ${({ theme }) => theme.white};

  @media only screen and (max-width: 992px) {
    padding-left: 0 !important;
  }
`;

const StyledPagesList = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
`;

const RightPanel = () => {
  const { pagination } = useSelector(
    (state) => state.selectorsSlice.currentSelectors
  );
  const { results } = useSelector((state) => state.itemsSlice.results);

  return (
    <StyledRightPanel>
      <Itmes />
      {Math.ceil(results / pagination) > 1 && (
        <StyledPagesList>
          <PagesList />
        </StyledPagesList>
      )}
    </StyledRightPanel>
  );
};

export default RightPanel;
