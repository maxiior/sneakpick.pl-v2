import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { VscTriangleDown } from "react-icons/vsc";
import { changeState } from "store/creator/actions";
import { useFormContext } from "react-hook-form";
import { useDetectOutsideClick } from "hooks/useDetectOutsideClick";
import Header from "components/WTS/Header";
import { Error } from "components/WTS/Error";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import {
  FIT_CATEGORIES,
  NO_SIZE_CATEGORIES,
  SNEAKERS_CATEGORIES,
} from "constants/filters";
import { firstLetterUppercase } from "functions/firstLetterUppercase";

const Wrapper = styled.div`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Container = styled.div<{ open: boolean; error: boolean }>`
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

const Arrow = styled(VscTriangleDown)<{ turned: boolean }>`
  transition-duration: 0.5s;
  font-size: 15px;
  color: ${({ theme }) => theme.blue};
  transform: ${({ turned }) => turned && "rotate(180deg)"};
`;

const ValueHolder = styled.div`
  display: inline-block;
  color: ${({ theme }) => theme.darkGrey};
`;

const ModesContainer = styled.div<{ open: boolean }>`
  width: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.white};
  display: ${({ open }) => (open ? "block" : "none")};
  text-align: left;

  left: 0;
  top: 30px;
  font-size: ${({ theme }) => theme.font_size_MD};
  font-weight: 400;
  z-index: 500;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Option = styled.span<{ isHighlighted: boolean }>`
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

interface iCombobox {
  title: string;
  filterType: string;
  elements: { id: number; text: string }[];
}

const Combobox = ({ title, elements, filterType }: iCombobox) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [cursor, setCursor] = useState(-1);
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(
    (state) => state.creatorSlice.currentFilters
  );
  useDetectOutsideClick(wrapperRef, setOpen);

  const { register, formState, setValue } = useFormContext();
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

        setValue("hasFit", FIT_CATEGORIES.includes(elements[cursor].text));
        setValue(
          "isSneakers",
          SNEAKERS_CATEGORIES.includes(elements[cursor].text)
        );
        setValue(
          "hasNoSize",
          NO_SIZE_CATEGORIES.includes(elements[cursor].text)
        );
        setValue("category", elements[cursor].text);

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
    <Wrapper>
      <Header>{title}</Header>
      <Container
        onClick={() => setOpen(!open)}
        ref={wrapperRef}
        open={open}
        error={formState.errors.category}
      >
        <ValueHolder>
          {categories === "placeholder"
            ? "np. Teesy"
            : firstLetterUppercase(categories)}
        </ValueHolder>
        <Arrow turned={open === true} />
        <ModesContainer open={open}>
          {elements.map((e: { id: number; text: string }, i: number) => (
            <StyledLabel key={i}>
              <StyledInput
                type="radio"
                {...register("category")}
                onChange={(el) => {
                  validator.onChange(el);
                  setCursor(i);
                  dispatch(
                    changeState({
                      type: filterType,
                      id: e.text,
                      input: "radio",
                    })
                  );
                  setOpen(false);
                  setValue("hasFit", FIT_CATEGORIES.includes(e.text));
                  setValue("isSneakers", SNEAKERS_CATEGORIES.includes(e.text));
                  setValue("hasNoSize", NO_SIZE_CATEGORIES.includes(e.text));
                  setValue("category", e.text);
                }}
                checked={categories === e.text}
              />
              <Option isHighlighted={cursor === i}>
                {firstLetterUppercase(e.text)}
              </Option>
            </StyledLabel>
          ))}
        </ModesContainer>
      </Container>
      {formState.errors.category && (
        <Error>{formState.errors.category.message}</Error>
      )}
    </Wrapper>
  );
};

export default Combobox;
