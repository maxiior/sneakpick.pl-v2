import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { VscTriangleDown } from "react-icons/vsc";
import { connect } from "react-redux";
import { changeState as changeStateAction } from "actions/WTS";
import { useFormContext } from "react-hook-form";

const Wrapper = styled.div`
  width: 70%;
  border-bottom: 1px solid
    ${({ theme, open, error }) =>
      open ? theme.blue : error ? theme.red : theme.grey};
  padding: 5px 12px;
  color: ${({ theme }) => theme.darkGrey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  user-select: none;
`;

const Arrow = styled(VscTriangleDown)`
  transition-duration: 0.5s;
  font-size: 15px;
  color: ${({ theme }) => theme.blue};

  ${({ turned }) =>
    turned &&
    css`
      transform: rotate(180deg);
    `}
`;

const ValueHolder = styled.div`
  display: inline-block;
  color: ${({ theme }) => theme.darkGrey};
`;

const ModesContainer = styled.div`
  width: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.white};
  display: ${({ open }) => (open ? "block" : "none")};
  text-align: left;

  left: 0;
  top: 30px;
  font-size: 14px;
  font-weight: 400;
  z-index: 500;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Option = styled.span`
  padding: 0 10px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;

  :hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }
`;

const StyledInput = styled.input`
  display: none;

  :checked ~ ${Option} {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }
`;

const StyledLabel = styled.label`
  cursor: pointer;
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

const Combobox = ({ elements, changeState, filterType, currentFilter }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);

  const { register, formState } = useFormContext();
  const validator = register("category");

  return (
    <Wrapper
      onClick={() => setOpen(!open)}
      ref={wrapperRef}
      open={open}
      error={formState.errors.category}
    >
      <ValueHolder>
        {currentFilter.categories === "placeholder"
          ? "np. Teesy"
          : currentFilter.categories}
      </ValueHolder>
      <Arrow turned={open === true} />
      <ModesContainer open={open}>
        {elements.map((e, i) => (
          <StyledLabel key={i}>
            <StyledInput
              type="radio"
              name="category"
              onChange={(el) => {
                validator.onChange(el);
                changeState(filterType, e.text, "radio");
                setOpen(false);
              }}
              checked={currentFilter.categories === e.text}
            />
            <Option>{e.text}</Option>
          </StyledLabel>
        ))}
      </ModesContainer>
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeState: (filterType, id, input) =>
    dispatch(changeStateAction(filterType, id, input)),
});

const mapStateToProps = ({ addingItemReducer }) => {
  return {
    currentFilter: addingItemReducer.currentFilters,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Combobox);
