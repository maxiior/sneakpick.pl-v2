import React from "react";
import SettingsTemplate from "templates/SettingsTemplate";
import styled from "styled-components";

const Header = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const ShipmentSettings = () => {
  return (
    <SettingsTemplate>
      <Header>Wysyłka</Header>
    </SettingsTemplate>
  );
};

export default ShipmentSettings;
