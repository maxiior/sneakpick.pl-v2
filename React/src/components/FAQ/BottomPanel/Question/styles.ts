import styled from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";

export const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const Key = styled.div<{ open: boolean }>`
  transition-duration: 0.5s;
  color: ${({ theme, open }) => (open ? theme.blue : theme.black)};
  font-weight: 500;
  user-select: none;
  font-size: 18px;
`;

export const Arrow = styled(MdKeyboardArrowDown)<{ open: boolean }>`
  transition-duration: 0.5s;
  color: ${({ theme, open }) => (open ? theme.blue : theme.black)};
  font-size: 25px;
  transform: ${({ open }) => open && "rotate(180deg)"};
`;

export const Value = styled.div`
  text-align: justify;
  text-justify: inter-word;
  margin-top: 15px;
  padding: 0 30px;
  font-size: ${({ theme }) => theme.font_size_MD};
`;
