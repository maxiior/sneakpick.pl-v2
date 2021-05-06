import React from "react";
import styled from "styled-components";
import { VscTriangleDown } from "react-icons/vsc";

const Header = styled.div`
  color: #777;
  font-weight: 400;
  display: inline-block;
  margin-left: 20px;
`;

const Arrow = styled(VscTriangleDown)`
  display: inline-block;
  transition-duration: 0.5s;
  font-size: 15px;
  color: #00b4ff;
  padding-left: 5px;
`;

const ValueHolder = styled.div`
  display: inline-block;
  color: #00b4ff;
  padding-left: 5px;

  :hover {
    text-decoration: underline;
  }
`;

const SortingMode = styled.div`
  position: relative;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
`;

const Mode = styled.div`
  padding: 0 10px;
  height: 25px;
  cursor: pointer;
`;

const ModesContainer = styled.div`
  width: 130px;
  position: absolute;
  background-color: white;
  display: none;
  text-align: left;
  border: 1px solid #f0f0f0;
  left: 0;
  font-size: 14px;
  font-weight: 400;
`;

const Sorting = () => {
  return (
    <>
      <Header>Sortowanie:</Header>
      <SortingMode>
        <ValueHolder>Domyślne</ValueHolder>
        <Arrow />
        <ModesContainer>
          <Mode>Domyślne</Mode>
          <Mode>Cena Rosnąco</Mode>
          <Mode>Cena Malejąco</Mode>
          <Mode>Popularne</Mode>
          <Mode>Najnowsze</Mode>
        </ModesContainer>
      </SortingMode>
    </>
  );
};

export default Sorting;
