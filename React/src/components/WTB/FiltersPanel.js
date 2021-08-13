import React, { useState } from "react";
import styled, { css } from "styled-components";
import { VscChevronLeft } from "react-icons/vsc";

const Arrow = styled(VscChevronLeft)`
  font-size: 30px;

  cursor: pointer;
  transform: rotate(270deg);
  position: absolute;
  right: 0;
  transition-duration: 0.5s;

  ${({ turned }) =>
    turned &&
    css`
      transform: rotate(90deg);
    `}
`;

const Wrapper = styled.div`
  width: 100%;
  font-size: 20px;
  padding: 0 32px;
  user-select: none;
`;

const Container = styled.div`
  padding: 15px 0;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Header = styled.div``;

const ListOfFilters = styled.div`
  height: 200px;
`;

const FiltersPanel = ({ className }) => {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper className={className}>
      <Container onClick={() => setOpen(!open)}>
        <Header>Filtry</Header>
        <Arrow turned={open} />
      </Container>
      {open && <ListOfFilters></ListOfFilters>}
    </Wrapper>
  );
};

export default FiltersPanel;
