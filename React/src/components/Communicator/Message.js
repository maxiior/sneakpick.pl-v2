import { useEffect, useState, useLayoutEffect, useRef } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import styled, { css } from "styled-components";
import { VscChevronRight } from "react-icons/vsc";

const Wrapper = styled.div`
  animation-name: displayCommunicator;
  animation-duration: 0.3s;
  right: 350px;
  height: 100%;
  width: 350px;
  background-color: ${({ theme }) => theme.moreDarkGrey};
  display: flex;
  flex-direction: column;
  right: 350px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
`;

const Close = styled(VscChevronRight)`
  cursor: pointer;
  font-size: 25px;
  color: ${({ theme }) => theme.white};

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const TopBar = styled.div`
  color: ${({ theme }) => theme.white};
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const Avatar = styled.div`
  background-color: ${({ theme }) => theme.lightGrey};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.grey};
`;

const Time = styled.div`
  color: ${({ theme }) => theme.blue};
  font-size: ${({ theme }) => theme.font_size_MD};
`;

const DisplayPanel = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme._5px};
`;

const BottomPanel = styled.div`
  flex-grow: 1;
  padding: 0 10px 10px 10px;
`;

const Container = styled.div`
  width: 245px;
  padding-left: 15px;
`;

const WritePanel = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.blue};
  bottom: 60px;
  padding: 10px;
`;

const Input = styled.div`
  width: 100%;
  min-height: 20px;
  max-height: 100px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.white};
  user-select: none;
  border: 0;
  outline: none;
  padding: 8px 12px;
  border-radius: 20px;

  ${({ scroll }) =>
    scroll &&
    css`
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    `}

  :empty:before {
    content: attr(placeholder);
    color: ${({ theme }) => theme.darkGrey};
    pointer-events: none;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.grey};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.moreDarkGrey};
  }
`;

const useSize = (target) => {
  const [size, setSize] = useState();

  useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

const Message = () => {
  const input = useRef(null);
  const size = useSize(input);

  useEffect(() => {
    if (input.current !== null) {
      input.current.setAttribute("contenteditable", "");
    }
  });

  return (
    <Wrapper>
      <TopBar>
        <Avatar />
        <Container>
          <Name>Michał Karmowski</Name>
          <Time> Aktywny(a) 2 godz. temu</Time>
        </Container>
        <Close />
      </TopBar>
      <BottomPanel inputHeight={input?.current?.style?.height}>
        <DisplayPanel />
      </BottomPanel>
      <WritePanel>
        <Input
          ref={input}
          placeholder="Wyślij wiadomość"
          scroll={size?.height > 80}
        />
      </WritePanel>
    </Wrapper>
  );
};

export default Message;
