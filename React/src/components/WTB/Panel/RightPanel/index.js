import Itmes from "components/WTB/Panel/RightPanel/Items";
import PagesList from "components/WTB/PagesList";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ItemsLoadingScreen from "components/common/ItemsLoadingScreen";

const Wrapper = styled.div`
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

const Holder = styled.div`
  padding: 40px;
`;

const RightPanel = () => {
  const { limit } = useSelector(
    (state) => state.selectorsSlice.currentSelectors
  );
  const { results, pending, items } = useSelector((state) => state.itemsSlice);

  return (
    <Wrapper>
      <Holder>{pending ? <ItemsLoadingScreen /> : <Itmes />}</Holder>
      {Math.ceil(results / limit) > 1 && items.length > 0 && (
        <StyledPagesList>
          <PagesList />
        </StyledPagesList>
      )}
    </Wrapper>
  );
};

export default RightPanel;
