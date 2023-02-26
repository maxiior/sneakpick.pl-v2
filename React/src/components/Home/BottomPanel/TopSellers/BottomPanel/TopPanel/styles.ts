import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 20px 0;
  background-color: ${({ theme }) => theme.lightGrey};
  padding: 15px 157px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
`;

export const Name = styled.div<{ right?: boolean }>`
  font-weight: 500;
  color: ${({ theme, right }) => (right ? theme.darkGrey : theme.black)};
  width: ${({ right }) => right && "95px"};
  text-align: ${({ right }) => right && "center"};
`;

export const Holder = styled.div`
  display: flex;
  width: 260px;
  justify-content: space-between;
`;
