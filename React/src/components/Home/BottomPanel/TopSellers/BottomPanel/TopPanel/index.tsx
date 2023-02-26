import React from "react";
import { Wrapper, Name, Holder } from "./styles";

const TopPanel: React.FC = () => {
  return (
    <Wrapper>
      <Name>Imię i nazwisko</Name>
      <Holder>
        <Name right>Komentarze</Name>
        <Name right>Ocena</Name>
      </Holder>
    </Wrapper>
  );
};

export default TopPanel;
