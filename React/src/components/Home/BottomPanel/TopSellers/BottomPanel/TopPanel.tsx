import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 20px 0;
  background-color: ${({ theme }) => theme.lightGrey};
  padding: 15px 157px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.div<{ right?: boolean }>`
  font-weight: 500;
  color: ${({ theme, right }) => (right ? theme.darkGrey : theme.black)};
  width: ${({ right }) => right && "95px"};
  text-align: ${({ right }) => right && "center"};
`;

const Holder = styled.div`
  display: flex;
  width: 260px;
  justify-content: space-between;
`;

const TopPanel = () => {
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
