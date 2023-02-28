import React from "react";
import ItemsSections from "components/Home/BottomPanel/ItemsSections";
import QuickSell from "components/Home/BottomPanel/QuickSell";
import ReleaseCalendar from "components/Home/BottomPanel/ReleaseCalendar";
import TopSellers from "components/Home/BottomPanel/TopSellers";
import { Wrapper, Container } from "./styles";

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
