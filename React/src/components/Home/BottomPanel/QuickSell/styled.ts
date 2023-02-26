import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
`;

export const Holder = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.veryDarkGrey};
  padding: 10px;
  display: flex;
  align-items: center;
`;

export const Timer = styled.div`
  margin-left: 15px;
  font-size: 14px;
`;
