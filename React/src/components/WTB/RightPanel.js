import Itmes from "components/WTB/Items";
import PagesList from "components/WTB/PagesList";
import styled from "styled-components";

const StyledRightPanel = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 250px;
  background-color: #fff;

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
  return (
    <StyledRightPanel>
      <Itmes />
      <StyledPagesList>
        <PagesList />
      </StyledPagesList>
    </StyledRightPanel>
  );
};

export default RightPanel;
