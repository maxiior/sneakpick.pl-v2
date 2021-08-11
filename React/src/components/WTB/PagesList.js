import { VscChevronLeft } from "react-icons/vsc";
import { useState } from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { changeState } from "actions/itemsSelector";

const Arrow = styled(VscChevronLeft)`
  font-size: 20px;
  color: #00b4ff;
  cursor: pointer;

  ${({ right }) =>
    right &&
    css`
      transform: rotate(180deg);
    `}

  ${({ blocked }) =>
    blocked &&
    css`
      color: #777 !important;
    `}
`;

const StyledPagesList = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 15px;
  right: 0;
`;

const Number = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  text-align: center;
  font-weight: 600;
  width: 30px;
  height: 30px;
  background-color: #f7f7f7;
  border-radius: 5px;
  user-select: none;
  margin: 0 5px;
  cursor: pointer;

  :hover {
    background-color: #4dc9ff;
    color: white;
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: #00b4ff;
      color: white;
    `}
`;

const Dots = styled.div`
  color: #777;
  font-size: 15px;
  margin: 0 5px;
  user-select: none;
`;

const PagesList = ({
  className,
  currentPage,
  changeState,
  results,
  currentPagination,
}) => {
  const number = Math.ceil(results / currentPagination);

  const changePage = (i) => {
    changeState("currentPage", i);
  };

  return (
    <StyledPagesList className={className}>
      {number !== 1 && (
        <Arrow
          onClick={() => currentPage > 1 && changePage(currentPage - 1)}
          blocked={currentPage === 1}
        />
      )}

      {currentPage === 1 && number > 1 && (
        <Number selected={currentPage === 1} onClick={() => changePage(1)}>
          1
        </Number>
      )}
      {currentPage === 1 && number > 2 && (
        <Number selected={currentPage === 2} onClick={() => changePage(2)}>
          2
        </Number>
      )}
      {currentPage === 1 && number > 3 && (
        <Number selected={currentPage === 3} onClick={() => changePage(3)}>
          3
        </Number>
      )}

      {currentPage > 2 && currentPage === number - 1 && (
        <Number
          selected={currentPage === currentPage - 1}
          onClick={() => changePage(currentPage - 1)}
        >
          {currentPage - 2}
        </Number>
      )}
      {currentPage > 1 && currentPage <= number - 2 && (
        <Number
          selected={currentPage === currentPage - 1}
          onClick={() => changePage(currentPage - 1)}
        >
          {currentPage - 1}
        </Number>
      )}
      {currentPage > 1 && currentPage <= number - 2 && (
        <Number selected={true} onClick={() => changePage(currentPage)}>
          {currentPage}
        </Number>
      )}
      {currentPage > 1 && currentPage <= number - 2 && (
        <Number
          selected={currentPage === currentPage + 1}
          onClick={() => changePage(currentPage + 1)}
        >
          {currentPage + 1}
        </Number>
      )}
      {currentPage < number - 2 && number > 4 && <Dots>...</Dots>}
      {currentPage > number - 2 && currentPage < number && currentPage - 1 > 0 && (
        <Number
          selected={currentPage === currentPage - 1}
          onClick={() => changePage(currentPage - 1)}
        >
          {currentPage - 1}
        </Number>
      )}
      {currentPage > number - 2 &&
        currentPage < number &&
        currentPage > 0 &&
        number > 2 && (
          <Number selected={true} onClick={() => changePage(currentPage)}>
            {currentPage}
          </Number>
        )}
      {currentPage === number && currentPage > 1 && (
        <>
          {number > 3 && (
            <Number
              selected={currentPage === number - 3}
              onClick={() => changePage(number - 3)}
            >
              {number - 3}
            </Number>
          )}
          {number > 2 && (
            <Number
              selected={currentPage === number - 2}
              onClick={() => changePage(number - 2)}
            >
              {number - 2}
            </Number>
          )}
          <Number
            selected={currentPage === number - 1}
            onClick={() => changePage(number - 1)}
          >
            {number - 1}
          </Number>
          <Number
            selected={currentPage === number}
            onClick={() => changePage(number)}
          >
            {number}
          </Number>
        </>
      )}
      {currentPage !== number && (
        <Number
          selected={currentPage === number}
          onClick={() => changePage(number)}
        >
          {number}
        </Number>
      )}
      {number !== 1 && (
        <Arrow
          right
          onClick={() => currentPage < number && changePage(currentPage + 1)}
          blocked={currentPage === number}
        />
      )}
    </StyledPagesList>
  );
};

const mapStateToProps = ({ itemsSelectorReducer, announsReducer }) => {
  return {
    currentPage: itemsSelectorReducer.currentPage,
    results: announsReducer.results,
    currentPagination: itemsSelectorReducer.currentPagination,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeState: (itemsSelectorType, data) =>
    dispatch(changeState(itemsSelectorType, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PagesList);
