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

  background-color: ${({ theme, isHighlighted }) =>
    isHighlighted ? theme.blue : theme.white};
  color: ${({ theme, isHighlighted }) =>
    isHighlighted ? theme.white : theme.darkGrey};
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  cursor: pointer;
`;

const Combobox = ({ elements, filterType }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [cursor, setCursor] = useState(-1);
  const dispatch = useDispatch();
  const { categories } = useSelector(
    (state) => state.creatorSlice.currentFilters
  );
  useDetectOutsideClick(wrapperRef, setOpen);

  const { register, formState } = useFormContext();
  const validator = register("category");

  const handleUserKeyPress = useCallback(
    (e) => {
      e.preventDefault();

      if (e.key === "ArrowDown") {
        setCursor(cursor < elements.length - 1 ? cursor + 1 : cursor);
      }
      if (e.key === "ArrowUp") {
        setCursor(cursor > 0 ? cursor - 1 : 0);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
      if (e.key === "Enter" && cursor >= 0) {
        e.preventDefault();
        dispatch(
          changeState({
            type: filterType,
            id: elements[cursor].text,
            input: "radio",
          })
        );
        setOpen(false);
      }
    },
    [cursor, elements, dispatch, filterType]
  );

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
                setCursor(i);
                dispatch(
                  changeState({ type: filterType, id: e.text, input: "radio" })
                );
                setOpen(false);
              }}
              checked={categories === e.text}
            />
            <Option isHighlighted={cursor === i}>{e.text}</Option>
          </StyledLabel>
        ))}
      </ModesContainer>
    </Wrapper>
  );
};

export default Combobox;
