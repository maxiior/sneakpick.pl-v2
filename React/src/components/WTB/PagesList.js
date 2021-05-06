import { VscChevronLeft } from "react-icons/vsc";
import styled, { css } from "styled-components";

const Arrow = styled(VscChevronLeft)`
  font-size: 20px;
  color: #00b4ff;
  cursor: pointer;

  ${({ right }) =>
    right &&
    css`
      transform: rotate(180deg);
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

  :nth-child(2) {
    background-color: #00b4ff;
    color: white;
  }
`;

const Dots = styled.div`
  color: #777;
  font-size: 15px;
  margin: 0 5px;
  user-select: none;
`;

const PagesList = () => {
  return (
    <StyledPagesList>
      <Arrow />
      <Number>1</Number>
      <Number>2</Number>
      <Number>3</Number>
      <Dots>...</Dots>
      <Number>10</Number>
      <Arrow right />
    </StyledPagesList>
  );
};

export default PagesList;
