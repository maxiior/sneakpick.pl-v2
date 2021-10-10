import { useState, useRef, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { VscTriangleDown } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { changeState } from "store/creator/actions";
import { useFormContext } from "react-hook-form";
import { useDetectOutsideClick } from "hooks/useDetectOutsideClick";

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

  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      background-color: ${({ theme }) => theme.blue};
      color: ${({ theme }) => theme.white};
    `}
`;

const StyledLabel = styled.label`
  cursor: pointer;
`;

const Combobox = ({ elements, filterType }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const { categories } = useSelector(
    (state) => state.creatorSlice.currentFilters
  );
  useDetectOutsideClick(wrapperRef, setOpen);

  const { register, formState } = useFormContext();
  const validator = register("category");

  const [cursor, setCursor] = useState(-1);

  const handleUserKeyPress = useCallback((e) => {
    e.preventDefault();

    if (e.key === "ArrowDown") {
      open && setCursor((c) => (c < elements.length - 1 ? c + 1 : c));
    }
    if (e.key === "ArrowUp") {
      setCursor((c) => (c > 0 ? c - 1 : 0));
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
    if (e.key === "Enter" && cursor >= 0) {
      // e.preventDefault();
      // setSearch(suggestions[cursor].text);
      // dispatch(changeState(filterType, suggestions[cursor].text, "radio"));
      // setOpen(false);
      // setCursor(-1);
      // delete formState.errors["brand"];
    }
  }, []);

  useEffect(() => {
    if (open === true) {
      window.addEventListener("keydown", handleUserKeyPress);
      return () => {
        window.removeEventListener("keydown", handleUserKeyPress);
      };
    }
  }, [handleUserKeyPress, open]);

  return (
    <Wrapper
      onClick={() => setOpen(!open)}
      ref={wrapperRef}
      open={open}
      error={formState.errors.category}
    >
      <ValueHolder>
        {categories === "placeholder" ? "np. Teesy" : categories}
      </ValueHolder>
      <Arrow turned={open === true} />
      <ModesContainer open={open}>
        {elements.map((e, i) => (
          <StyledLabel key={i}>
            <StyledInput
              type="radio"
              name="category"
              {...register("category")}
              onChange={(el) => {
                validator.onChange(el);
                dispatch(
                  changeState({ type: filterType, id: e.text, input: "radio" })
                );
                setOpen(false);
              }}
              checked={categories === e.text}
              isHighlighted={cursor === i}
            />
            <Option>{e.text}</Option>
          </StyledLabel>
        ))}
      </ModesContainer>
    </Wrapper>
  );
};

export default Combobox;
