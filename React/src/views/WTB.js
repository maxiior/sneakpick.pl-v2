import Panel from "components/WTB/Panel";
import TopNav from "components/WTB/TopNav";
import React, { useState } from "react";
import styled from "styled-components";
import wtb from "assets/wtb.png";

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
`;

const WTB = () => {
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
    <Wrapper>
      <Header>WANT TO BUY</Header>
      <TopNav steps={steps} />
      <Panel />
    </Wrapper>
  );
};

export default WTB;
