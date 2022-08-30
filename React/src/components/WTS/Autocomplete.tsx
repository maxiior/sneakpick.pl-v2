import { useState, useRef, useMemo } from "react";
import styled from "styled-components";
import { VscTriangleDown } from "react-icons/vsc";
import { changeState } from "store/creator/actions";
import { useFormContext } from "react-hook-form";
import { useDetectOutsideClick } from "hooks/useDetectOutsideClick";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import Header from "components/WTS/Header";
import { Error } from "components/WTS/Error";

const Wrapper = styled.div``;

const Container = styled.div<{ open: boolean; error: boolean }>`
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
const Arrow = styled(VscTriangleDown)<{ turned: boolean }>`
  transition-duration: 0.5s;
  font-size: 15px;
  color: ${({ theme }) => theme.blue};
  transform: ${({ turned }) => turned && "rotate(180deg)"};
`;

const ValueHolder = styled.input`
  display: inline-block;
  color: ${({ theme }) => theme.darkGrey};
  width: 100%;
  border: 0;
  outline: none;
  padding: 0;
`;

const Mode = styled.div<{ isHighlighted: boolean }>`
  padding: 0 10px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;

  background-color: ${({ theme, isHighlighted }) =>
    isHighlighted && theme.blue};
  color: ${({ theme, isHighlighted }) => isHighlighted && theme.white};

  :hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }
`;

const ModesContainer = styled.div`
  width: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.white};
  display: block;
  text-align: left;
  left: 0;
  top: 30px;
  font-size: ${({ theme }) => theme.font_size_MD};
  font-weight: 400;
  z-index: 500;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

interface iAutocomplete {
  title: string;
  elements: { id: number; text: string }[];
  filterType: string;
  placeholder: string;
}

const Autocomplete = ({
  title,
  elements,
  filterType,
  placeholder,
}: iAutocomplete) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const dispatch = useAppDispatch();
  const { brands } = useAppSelector(
    (state) => state.creatorSlice.currentFilters
  );
  const { register, formState, setValue } = useFormContext();

  useDetectOutsideClick(wrapperRef, setOpen);

  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(-1);

  const suggestions = useMemo(() => {
    if (!search) return elements;

    return elements.filter((e: any) =>
      e.text.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, elements]);

  const keyboardNavigation = (e: any) => {
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
      setValue("brand", suggestions[cursor].text);

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

  const validator = register("brand");

  return (
    <Wrapper>
      <Header>{title}</Header>
      <Container
        onClick={() => setOpen(!open)}
        ref={wrapperRef}
        open={open}
        error={formState.errors.brand}
      >
        <ValueHolder
          type="text"
          autoComplete="off"
          maxLength={100}
          placeholder={placeholder}
          value={brands !== "placeholder" ? brands : ""}
          {...register("brand")}
          onChange={(e) => {
            validator.onChange(e);
            if (!open) setOpen(true);
            setSearch(e.target.value);
            setValue("brand", e.target.value);
            dispatch(
              changeState({
                type: filterType,
                id: e.target.value,
                input: "text",
              })
            );
            setCursor(-1);
          }}
          onKeyDown={(e) => keyboardNavigation(e)}
        />
        <Arrow turned={open === true} />
        {open && (
          <ModesContainer>
            {suggestions.slice(0, 8).map((e: any, i: number) => (
              <Mode
                key={i}
                onClick={() => {
                  dispatch(
                    changeState({
                      type: filterType,
                      id: e.text,
                      input: "radio",
                    })
                  );
                  setValue("brand", e.text);
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
      </Container>
      {formState.errors.brand && (
        <Error>{formState.errors.brand.message}</Error>
      )}
    </Wrapper>
  );
};

export default Autocomplete;
