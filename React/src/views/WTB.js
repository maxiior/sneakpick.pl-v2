import Panel from "components/WTB/Panel";
import TopNav from "components/WTB/TopNav";
import React from "react";
import styled from "styled-components";
import wtb from "assets/wtb.png";
import MobileFilters from "components/WTB/MobileFilters";
import { connect } from "react-redux";
import { ScrollToTop } from "components/ScrollToTop/ScrollToTop";
import OnSearch from "components/OnSearch";

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${wtb});
  height: 250px;
  width: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  color: ${({ theme }) => theme.blue};
  font-size: 4vw;
  user-select: none;

  @media only screen and (max-width: 1200px) {
    font-size: 6vw;
  }
  @media only screen and (max-width: 993px) {
    font-size: 8vw;
  }
  @media only screen and (max-width: 768px) {
    font-size: 10vw;
  }
`;

const Wrapper = styled.main`
  display: block;
  height: 100%;
`;

const WTB = ({ mobileFilters }) => {
  return (
    <>
      <OnSearch />
      {mobileFilters && (
        <>
          <ScrollToTop />
          <MobileFilters />
        </>
      )}
      <Wrapper>
        <Header>WANT TO BUY</Header>
        <TopNav />
        <Panel />
      </Wrapper>
    </>
  );
};

const mapStateToProps = ({ filtersReducer }) => {
  return {
    mobileFilters: filtersReducer.mobileFilters,
  };
};

export default connect(mapStateToProps)(WTB);
