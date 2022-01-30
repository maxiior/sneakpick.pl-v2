import React from "react";
import styled from "styled-components";
import ItemsSections from "components/Home/BottomPanel/ItemsSections";
import QuickSell from "components/Home/BottomPanel/QuickSell";
import ReleaseCalendar from "components/Home/BottomPanel/ReleaseCalendar";
import TopSellers from "components/Home/BottomPanel/TopSellers";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 0;
`;

const Container = styled.div`
  width: 90%;
`;

const BottomPanel: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <QuickSell />
        <ItemsSections />
        <ReleaseCalendar />
        <TopSellers />
      </Container>
    </Wrapper>
  );
};

export default BottomPanel;
