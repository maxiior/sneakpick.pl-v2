import { useState, useRef, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { VscTriangleDown } from "react-icons/vsc";
import { useFormContext } from "react-hook-form";
import { useDetectOutsideClick } from "hooks/useDetectOutsideClick";

const Wrapper = styled.div<{ open: Boolean; error: Boolean }>`
  width: 100%;
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

const Arrow = styled(VscTriangleDown)<{ turned: Boolean }>`
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

const ModesContainer = styled.div<{ open: Boolean }>`
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

const StyledInput = styled.input<{ isHighlighted: Boolean }>`
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

interface iCombobox {
  elements: String[];
  current: string;
  setCurrent: Function;
}

const Combobox = ({ elements, current, setCurrent }: iCombobox) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  useDetectOutsideClick(wrapperRef, setOpen);

  const { register, formState } = useFormContext();
  const validator = register("subject");

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

  console.log(formState.errors);

  return (
    <Wrapper
      onClick={() => setOpen(!open)}
      ref={wrapperRef}
      open={open}
      error={formState.errors.subject}
    >
      <ValueHolder>
        {current === "placeholder" ? "Wybierz temat" : current}
      </ValueHolder>
      <Arrow turned={open === true} />
      <ModesContainer open={open}>
        {elements.map((e, i) => (
          <StyledLabel key={i}>
            <StyledInput
              type="radio"
              {...register("subject")}
              onChange={(el) => {
                validator.onChange(el);
                setCurrent(e);
                setOpen(false);
              }}
              checked={current === e}
              isHighlighted={cursor === i}
            />
            <Option>{e}</Option>
          </StyledLabel>
        ))}
      </ModesContainer>
    </Wrapper>
  );
};

export default Combobox;
