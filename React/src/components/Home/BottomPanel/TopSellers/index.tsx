import React from "react";
import BottomPanel from "./BottomPanel";
import { Wrapper, TopPanel, Header, ShowAll } from "./style";
import { routes } from "routes";

const TopSellers: React.FC = () => {
  return (
    <Wrapper>
      <TopPanel>
        <Header>Top sprzedawcy</Header>
        <ShowAll to={routes.TOP_SELLERS}>Zobacz wszystko</ShowAll>
      </TopPanel>
      <BottomPanel />
    </Wrapper>
  );
};

export default TopSellers;
