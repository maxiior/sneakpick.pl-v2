import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { openMobileFilters as openMobileFiltersAction } from "actions/WTB";

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

const FiltersPanel = ({ className, openMobileFilters }) => {
  return (
    <Wrapper className={className}>
      <Container onClick={() => openMobileFilters()}>
        <Header>Filtry</Header>
      </Container>
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openMobileFilters: () => dispatch(openMobileFiltersAction()),
});

export default connect(null, mapDispatchToProps)(FiltersPanel);
