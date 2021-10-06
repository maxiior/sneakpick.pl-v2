import React, { useState, useRef, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
import { VscTriangleDown } from "react-icons/vsc";
import { changeState } from "store/creator/actions";
import { useDispatch, useSelector } from "react-redux";
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

const ValueHolder = styled.input`
  display: inline-block;
  color: ${({ theme }) => theme.darkGrey};
  width: 100%;
  border: 0;
  outline: none;
  padding: 0;
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

  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      background-color: ${({ theme }) => theme.blue};
      color: ${({ theme }) => theme.white};
    `}
`;

const ModesContainer = styled.div`
  width: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.white};
  display: block;
  text-align: left;
  left: 0;
  top: 30px;
  font-size: 14px;
  font-weight: 400;
  z-index: 500;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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

const Autocomplete = ({ elements, filterType, placeholder }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.creatorSlice.currentFilters);

  useOutsideAlerter(wrapperRef, setOpen);

  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(-1);

  const suggestions = useMemo(() => {
    if (!search) return elements;

    return elements.filter((e) =>
      e.text.toLowerCase().includes(search.toLowerCase())
    );
  });

  const keyboardNavigation = (e) => {
    if (e.key === "ArrowDown") {
      open
        ? setCursor((c) => (c < suggestions.length - 1 ? c + 1 : c))
        : setOpen(true);
    }
    if (e.key === "ArrowUp") {
      setCursor((c) => (c > 0 ? c - 1 : 0));
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
    if (e.key === "Enter" && cursor >= 0) {
      e.preventDefault();
      setSearch(suggestions[cursor].text);
      dispatch(
        changeState({
          type: filterType,
          id: suggestions[cursor].text,
          input: "radio",
        })
      );
      setOpen(false);
      setCursor(-1);
      delete formState.errors["brand"];
    }
  };

  const { register, formState } = useFormContext();
  const validator = register("brand");

  return (
    <Wrapper
      onClick={() => setOpen(!open)}
      ref={wrapperRef}
      open={open}
      error={formState.errors.brand}
    >
      <ValueHolder
        type="text"
        name="brand"
        autoComplete="off"
        maxLength={100}
        placeholder={placeholder}
        value={brands !== "placeholder" ? brands : ""}
        {...register("brand")}
        onChange={(e) => {
          validator.onChange(e);
          if (!open) setOpen(true);
          setSearch(e.target.value);
          dispatch(
            changeState({ type: filterType, id: e.target.value, input: "text" })
          );
          setCursor(-1);
        }}
        onKeyDown={(e) => keyboardNavigation(e)}
      />
      <Arrow turned={open === true} />
      {open && (
        <ModesContainer>
          {suggestions.slice(0, 8).map((e, i) => (
            <Mode
              onClick={() => {
                dispatch(
                  changeState({ type: filterType, id: e.text, input: "radio" })
                );
                setSearch(e.text);
                delete formState.errors["brand"];
              }}
              isHighlighted={cursor === i}
            >
              {e.text}
            </Mode>
          ))}
        </ModesContainer>
      )}
    </Wrapper>
  );
};

export default Autocomplete;
