import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.white};
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

export const Container = styled.div`
  width: 80%;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    text-align: center;
  }
`;

export const Header = styled.div`
  font-size: 50px;
  font-weight: 500;
`;
