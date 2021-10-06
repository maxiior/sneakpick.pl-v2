import React from "react";
import styled from "styled-components";
import SubDropdown from "components/Nav/SubDropdown";

const StyledSubDropdown = styled(SubDropdown)`
  display: none;
`;

const Wrapper = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 15px;
  border-right: 3px solid ${({ theme }) => theme.white};

  :hover {
    color: ${({ theme }) => theme.blue};
    background-color: ${({ theme }) => theme.lightGrey};
    border-right: 3px solid ${({ theme }) => theme.blue};
  }

  :hover ${StyledSubDropdown} {
    display: block;
  }
`;

const DropdownOption = ({ name }) => {
  return (
    <Wrapper>
      <div>{name}</div>
      <StyledSubDropdown />
    </Wrapper>
  );
};

export default DropdownOption;