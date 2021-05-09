import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { VscTriangleDown } from "react-icons/vsc";

const Header = styled.div`
  color: #777;
  font-weight: 400;
  display: inline-block;
  margin-left: 20px;
`;

const Arrow = styled(VscTriangleDown)`
  display: inline-block;
  transition-duration: 0.5s;
  font-size: 15px;
  color: #00b4ff;
  margin-left: 5px;

  ${({ turned }) =>
    turned &&
    css`
      transform: rotate(180deg);
    `}
`;

const ValueHolder = styled.div`
  display: inline-block;
  color: #00b4ff;
  padding-left: 5px;

  :hover {
    text-decoration: underline;
  }
`;

const SortingMode = styled.div`
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
    background-color: #00b4ff;
    color: white;
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: #00b4ff;
      color: white;
    `}
`;

const ModesContainer = styled.div`
  width: 130px;
  position: absolute;
  background-color: white;
  display: block;
  text-align: left;
  border: 1px solid #f0f0f0;
  left: 0;
  top: 22px;
  font-size: 14px;
  font-weight: 400;
  z-index: 500;
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

const Sorting = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(1);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);

  return (
    <>
      <Header>Sortowanie:</Header>
      <SortingMode onClick={() => setOpen(!open)} ref={wrapperRef}>
        <ValueHolder>
          {mode === 1 && "Domyślne"}
          {mode === 2 && "Cena Rosnąco"}
          {mode === 3 && "Cena Malejąco"}
          {mode === 4 && "Popularne"}
          {mode === 5 && "Najnowsze"}
        </ValueHolder>
        <Arrow turned={open === true && true} />
        {open && (
          <ModesContainer>
            <Mode selected={mode === 1 && true} onClick={() => setMode(1)}>
              Domyślne
            </Mode>
            <Mode selected={mode === 2 && true} onClick={() => setMode(2)}>
              Cena Rosnąco
            </Mode>
            <Mode selected={mode === 3 && true} onClick={() => setMode(3)}>
              Cena Malejąco
            </Mode>
            <Mode selected={mode === 4 && true} onClick={() => setMode(4)}>
              Popularne
            </Mode>
            <Mode selected={mode === 5 && true} onClick={() => setMode(5)}>
              Najnowsze
            </Mode>
          </ModesContainer>
        )}
      </SortingMode>
    </>
  );
};

export default Sorting;
