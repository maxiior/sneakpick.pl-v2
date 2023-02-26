import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
`;

export const Container = styled.div`
  width: 80%;
  border: 1px solid ${({ theme }) => theme.lightGrey};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;
