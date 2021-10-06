import React from "react";
import styled from "styled-components";
import DropdownOption from "components/Nav/DropdownOption";

const Wrapper = styled.div`
  position: absolute;
  bottom: -210px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Dropdown = ({ className }) => {
  return (
    <Wrapper className={className}>
      <DropdownOption name="Nike" />
      <DropdownOption name="Adidas" />
      <DropdownOption name="Supreme" />
      <DropdownOption name="Puma" />
      <DropdownOption name="New Balance" />
    </Wrapper>
  );
};

export default Dropdown;