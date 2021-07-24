import Filters from "components/WTB/Filters";
import PagesList from "components/WTB/PagesList";
import styled from "styled-components";
import Path from "components/WTB/Path";
import Results from "components/WTB/Results";
import Sorting from "components/WTB/Sorting";

const Nav = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #fff;
  font-size: 16px;
  user-select: none;
  border-bottom: 1px solid #f0f0f0;
  box-sizing: border-box;
`;

const RightPanel = styled.div`
  padding-left: 250px;
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    padding: 0;
  }
`;

const TopNav = ({ steps, results }) => {
  return (
    <Nav>
      <Filters />
      <RightPanel>
        <div>
          <Path steps={steps} />
          <Results results={results} />
          <Sorting />
        </div>
        <PagesList />
      </RightPanel>
    </Nav>
  );
};

export default TopNav;
