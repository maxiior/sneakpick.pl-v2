import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { VscTriangleDown } from "react-icons/vsc";
import { connect } from "react-redux";
import { changeState } from "actions/itemsSelector";

const Header = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  font-weight: 400;
  display: inline-block;
  margin-left: 20px;
`;

const Arrow = styled(VscTriangleDown)`
  display: inline-block;
  transition-duration: 0.5s;
  font-size: 15px;
  color: ${({ theme }) => theme.blue};
  margin-left: 5px;

  ${({ turned }) =>
    turned &&
    css`
      transform: rotate(180deg);
    `}
`;

const ValueHolder = styled.div`
  display: inline-block;
  color: ${({ theme }) => theme.blue};
  padding-left: 5px;

  :hover {
    text-decoration: underline;
  }
`;

const ComboBoxMode = styled.div`
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-weight: 600;
`;

const Mode = styled.div`
  padding: 0 10px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;

  :hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.blue};
      color: ${({ theme }) => theme.white};
    `}
`;

const ModesContainer = styled.div`
  width: 130px;
  position: absolute;
  background-color: ${({ theme }) => theme.white};
  display: block;
  text-align: left;
  border: 1px solid ${({ theme }) => theme.lightGrey};
  left: 0;
  top: 22px;
  font-size: 14px;
  font-weight: 400;
  z-index: 500;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const StyledComboBox = styled.div`
  display: inline-block;
`;

const useOutsideAlerter = (ref, setOpen) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const ComboBox = ({
  className,
  name,
  elements,
  itemsSelectorType,
  changeState,
  currentPagination,
  currentSorting,
  sorting,
}) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(() => {
    if (sorting) return currentSorting;
    else return currentPagination;
  });

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);

  return (
    <StyledComboBox className={className}>
      <Header>{name}:</Header>
      <ComboBoxMode onClick={() => setOpen(!open)} ref={wrapperRef}>
        <ValueHolder>{mode}</ValueHolder>
        <Arrow turned={open === true} />
        {open && (
          <ModesContainer>
            {elements.map((element, i) => (
              <Mode
                selected={mode === element}
                onClick={() => {
                  setMode(element);
                  changeState(itemsSelectorType, elements[i]);
                }}
              >
                {element}
              </Mode>
            ))}
          </ModesContainer>
        )}
      </ComboBoxMode>
    </StyledComboBox>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeState: (itemsSelectorType, data) =>
    dispatch(changeState(itemsSelectorType, data)),
});

const mapStateToProps = ({ itemsSelectorReducer, announsReducer }) => {
  return {
    results: announsReducer.results,
    currentPagination: itemsSelectorReducer.currentPagination,
    currentSorting: itemsSelectorReducer.currentSorting,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboBox);
