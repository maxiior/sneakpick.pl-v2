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

const ComboBox = ({ className, name, elements }) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(1);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);

  return (
    <StyledComboBox className={className}>
      <Header>{name}:</Header>
      <ComboBoxMode onClick={() => setOpen(!open)} ref={wrapperRef}>
        <ValueHolder>
          {elements.filter((element, i) => mode === i + 1 && element)}
        </ValueHolder>
        <Arrow turned={open === true && true} />
        {open && (
          <ModesContainer>
            {elements.map((element, i) => (
              <Mode
                selected={mode === i + 1 && true}
                onClick={() => setMode(i + 1)}
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

export default ComboBox;
