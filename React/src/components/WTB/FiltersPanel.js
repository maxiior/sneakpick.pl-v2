import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { openMobileFilters } from "store/interface/actions";
import { HiAdjustments } from "react-icons/hi";

const Wrapper = styled.div`
  width: 100%;
  font-size: 20px;
  padding: 0 32px;
  user-select: none;
`;

const Container = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  display: flex;
  align-items: center;
  position: relative;
`;

const Header = styled(HiAdjustments)`
  font-size: 40px;
  color: ${({ theme }) => theme.blue};
  cursor: pointer;
  transform: rotate(90deg);
`;

const FiltersPanel = ({ className }) => {
  const dispatch = useDispatch();

  return (
    <Wrapper className={className}>
      <Container>
        <Header onClick={() => dispatch(openMobileFilters())} />
      </Container>
    </Wrapper>
  );
};

export default FiltersPanel;
