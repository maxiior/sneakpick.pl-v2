import React from "react";
import { routes } from "routes";
import { name } from "constants/name";
import { Wrapper, Header, Holder, Button } from "./styles";

const TopPanel: React.FC = () => {
  return (
    <Wrapper>
      <div>
        <Header>{name}</Header>
        <Holder>
          <Button to={routes.WTB + routes.DEFAULT_SEARCH} buy>
            BUY
          </Button>
          <Button to={routes.WTS}>SELL</Button>
        </Holder>
      </div>
    </Wrapper>
  );
};

export default TopPanel;
