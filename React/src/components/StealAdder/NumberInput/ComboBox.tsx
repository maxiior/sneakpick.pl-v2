import { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { VscTriangleDown } from "react-icons/vsc";
import { useDetectOutsideClick } from "hooks/useDetectOutsideClick";

const Arrow = styled(VscTriangleDown)<{ turned: boolean }>`
  display: inline-block;
  transition-duration: 0.5s;
  font-size: ${({ theme }) => theme.font_size_SM};
  color: ${({ theme }) => theme.blue};
  margin-left: 5px;
  transform: ${({ turned }) => turned && "rotate(180deg)"};
`;

const Value = styled.div`
  display: inline-block;
  color: ${({ theme }) => theme.blue};
  padding-left: 5px;

  :hover {
    text-decoration: underline;
  }
`;

const Container = styled.div`
  position: relative;
  cursor: pointer;
`;

const Mode = styled.div<{ selected: boolean }>`
  padding: 0 10px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;

  :hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.blue};
      color: ${({ theme }) => theme.white};
    `}
`;

const Modes = styled.div`
  width: 70px;
  position: absolute;
  background-color: ${({ theme }) => theme.white};
  text-align: left;
  border: 1px solid ${({ theme }) => theme.lightGrey};
  left: 0;
  top: 22px;
  font-size: ${({ theme }) => theme.font_size_MD};
  z-index: 500;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 60px;
`;

const ComboBox = ({ unit, setUnit }: { unit: string; setUnit: Function }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  useDetectOutsideClick(wrapperRef, setOpen);

  return (
    <Wrapper>
      <Container onClick={() => setOpen(!open)} ref={wrapperRef}>
        <Value>{unit}</Value>
        <Arrow turned={open === true} />
        {open && (
          <Modes>
            {["PLN", "%"].map((element, i) => (
              <Mode
                selected={element === unit}
                onClick={() => setUnit(element)}
              >
                {element}
              </Mode>
            ))}
          </Modes>
        )}
      </Container>
    </Wrapper>
  );
};

export default ComboBox;
