import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  background-color: ${({ theme }) => theme.white};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Option = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 15px;
  border-right: 3px solid ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.veryDarkGrey};

  :hover {
    color: ${({ theme }) => theme.blue};
    background-color: ${({ theme }) => theme.lightGrey};
    border-right: 3px solid ${({ theme }) => theme.blue};
  }
`;

const SubDropdown = ({ className }) => {
  return (
    <Wrapper className={className}>
      <Option>Sneakersy</Option>
      <Option>Hoodie</Option>
      <Option>Teesy</Option>
      <Option>Koszule</Option>
      <Option>Crewnecki</Option>
    </Wrapper>
  );
};

export default SubDropdown;
