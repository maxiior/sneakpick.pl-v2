import Panel from "components/WTB/Panel";
import TopNav from "components/WTB/TopNav";
import React, { useState } from "react";
import styled from "styled-components";
import wtb from "assets/wtb.png";
import MobileFilters from "components/WTB/MobileFilters";
import { connect } from "react-redux";
import { ScrollToTop } from "components/ScrollToTop/ScrollToTop";

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
  font-size: 4em;
  user-select: none;
`;

const Wrapper = styled.main`
  display: block;
  height: 100%;
`;

const WTB = ({ mobileFilters }) => {
  const [steps, setSteps] = useState([
    {
      id: 1,
      name: "Sneakersy",
      path: "/all/sneakersy",
    },
    {
      id: 2,
      name: "Nike",
      path: "/all/sneakersy/nike",
    },
  ]);

  return (
    <>
      {mobileFilters && (
        <>
          <ScrollToTop />
          <MobileFilters />
        </>
      )}
      <Wrapper>
        <Header>WANT TO BUY</Header>
        <TopNav steps={steps} />
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
