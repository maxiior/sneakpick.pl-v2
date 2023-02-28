import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { VscTriangleDown } from "react-icons/vsc";
import { useFormContext } from "react-hook-form";
import { useDetectOutsideClick } from "hooks/useDetectOutsideClick";

const Wrapper = styled.div<{ open: boolean; error: boolean }>`
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

const Value = styled.div`
  display: inline-block;
  color: ${({ theme }) => theme.darkGrey};
`;

const Arrow = styled(VscTriangleDown)<{ turned: boolean }>`
  transition-duration: 0.5s;
  font-size: 15px;
  color: ${({ theme }) => theme.blue};
  transform: ${({ turned }) => turned && "rotate(180deg)"};
`;

const Holder = styled.div<{ open: Boolean }>`
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

const Label = styled.label`
  cursor: pointer;
`;

const Option = styled.span<{ highlighted: boolean }>`
  padding: 0 10px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: ${({ theme, highlighted }) =>
    highlighted ? theme.blue : theme.white};
  color: ${({ theme, highlighted }) =>
    highlighted ? theme.white : theme.darkGrey};

  :hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }
`;

const Input = styled.input<{ highlighted: boolean }>`
  display: none;
  background-color: ${({ theme, highlighted }) => highlighted && theme.blue};
  color: ${({ theme, highlighted }) => highlighted && theme.white};

  :checked ~ ${Option} {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }
`;

interface iCombobox {
  elements: string[];
  current: string;
  setCurrent: Function;
}

const Combobox = ({ elements, current, setCurrent }: iCombobox) => {
  const [cursor, setCursor] = useState(-1);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const { register, formState, setValue } = useFormContext();
  const validator = register("subject");

  useDetectOutsideClick(wrapperRef, setOpen);

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

        setCurrent(elements[cursor]);
        setValue("subject", elements[cursor]);
        setOpen(false);
        delete formState.errors["subject"];
      }
    },
    [cursor, elements, setValue, setCurrent, formState]
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
      error={formState.errors.subject}
    >
      <Value>{current === "placeholder" ? "Wybierz temat" : current}</Value>
      <Arrow turned={open === true} />
      <Holder open={open}>
        {elements.map((e, i) => (
          <Label key={i}>
            <Input
              type="radio"
              {...register("subject")}
              onChange={(el) => {
                validator.onChange(el);
                setCursor(i);
                setCurrent(e);
                setOpen(false);
              }}
              checked={current === e && cursor === i}
              highlighted={cursor === i}
            />
            <Option highlighted={cursor === i}>{e}</Option>
          </Label>
        ))}
      </Holder>
    </Wrapper>
  );
};

export default Combobox;
