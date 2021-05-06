import Announcements from "components/WTB/Announcements";
import PagesList from "components/WTB/PagesList";
import styled from "styled-components";

const StyledRightPanel = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 250px;
  background-color: #fff;

  @media only screen and (max-width: 768px) {
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
      <Announcements />
      <StyledPagesList>
        <PagesList />
      </StyledPagesList>
    </StyledRightPanel>
  );
};

export default RightPanel;
