import React from "react";
import { Wrapper, TopPanel, Header, ShowAll } from "./styled";
import { routes } from "routes";

const ReleaseCalendar: React.FC = () => {
  return (
    <Wrapper>
      <TopPanel>
        <Header>Kalendarz premier</Header>
        <ShowAll to={routes.RELEASE_CALENDAR}>Zobacz wszystko</ShowAll>
      </TopPanel>
    </Wrapper>
  );
};

export default ReleaseCalendar;
