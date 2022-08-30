import { VscChevronLeft } from "react-icons/vsc";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { onFilterClick } from "functions/onFilterClick";
import { useHistory } from "react-router-dom";

const Arrow = styled(VscChevronLeft)`
  font-size: 20px;
  color: ${({ theme }) => theme.blue};
  cursor: pointer;

  transform: ${({ right }) => right && "rotate(180deg)"};
  color: ${({ theme, blocked }) => blocked && theme.darkGrey} !important;
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
  color: ${({ theme }) => theme.darkGrey};
  text-align: center;
  font-weight: 600;
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.lightGrey};
  border-radius: ${({ theme }) => theme._5px};
  user-select: none;
  margin: 0 5px;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.hoverBlue};
    color: ${({ theme }) => theme.white};
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.blue};
      color: ${({ theme }) => theme.white};
    `}
`;

const Dots = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  font-size: 15px;
  margin: 0 5px;
  user-select: none;
`;

const PagesList = ({ className }) => {
  const { page, limit } = useSelector(
    (state) => state.selectorsSlice.currentSelectors
  );
  const { results } = useSelector((state) => state.itemsSlice);
  const number = Math.ceil(results / limit);
  const history = useHistory();

  const changePage = (i) => {
    onFilterClick("page", i, "radio", history);
  };

  return (
    <StyledPagesList className={className}>
      <Arrow
        onClick={() => page > 1 && changePage(page - 1)}
        blocked={page === 1}
      />
      {page === 1 && (
        <Number selected={page === 1} onClick={() => changePage(1)}>
          1
        </Number>
      )}
      {page === 1 && number > 2 && (
        <Number selected={page === 2} onClick={() => changePage(2)}>
          2
        </Number>
      )}
      {page === 1 && number > 3 && (
        <Number selected={page === 3} onClick={() => changePage(3)}>
          3
        </Number>
      )}

      {page > 2 && page === number - 1 && (
        <Number
          selected={page === page - 1}
          onClick={() => changePage(page - 1)}
        >
          {page - 2}
        </Number>
      )}
      {page > 1 && page <= number - 2 && (
        <Number
          selected={page === page - 1}
          onClick={() => changePage(page - 1)}
        >
          {page - 1}
        </Number>
      )}
      {page > 1 && page <= number - 2 && (
        <Number selected={true} onClick={() => changePage(page)}>
          {page}
        </Number>
      )}
      {page > 1 && page <= number - 2 && (
        <Number
          selected={page === page + 1}
          onClick={() => changePage(page + 1)}
        >
          {page + 1}
        </Number>
      )}
      {page < number - 2 && number > 4 && <Dots>...</Dots>}
      {page > number - 2 && page < number && page - 1 > 0 && (
        <Number
          selected={page === page - 1}
          onClick={() => changePage(page - 1)}
        >
          {page - 1}
        </Number>
      )}
      {page > number - 2 && page < number && page > 0 && number > 2 && (
        <Number selected={true} onClick={() => changePage(page)}>
          {page}
        </Number>
      )}
      {page === number && page > 1 && (
        <>
          {number > 3 && (
            <Number
              selected={page === number - 3}
              onClick={() => changePage(number - 3)}
            >
              {number - 3}
            </Number>
          )}
          {number > 2 && (
            <Number
              selected={page === number - 2}
              onClick={() => changePage(number - 2)}
            >
              {number - 2}
            </Number>
          )}
          <Number
            selected={page === number - 1}
            onClick={() => changePage(number - 1)}
          >
            {number - 1}
          </Number>
          <Number selected={page === number} onClick={() => changePage(number)}>
            {number}
          </Number>
        </>
      )}
      {page !== number && (
        <Number selected={page === number} onClick={() => changePage(number)}>
          {number}
        </Number>
      )}
      <Arrow
        right
        onClick={() => page < number && changePage(page + 1)}
        blocked={page === number}
      />
    </StyledPagesList>
  );
};

export default PagesList;
