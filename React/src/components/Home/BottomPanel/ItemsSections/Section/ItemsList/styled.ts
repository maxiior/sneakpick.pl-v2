import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  user-select: none;

  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.grey};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.blue};
  }
`;

export const Container = styled.div`
  min-width: 1270px;
  max-width: calc(100% - 8px);
`;
