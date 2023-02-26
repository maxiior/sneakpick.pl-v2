import styled from "styled-components";
import PagesList from "components/WTB/PagesList";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  user-select: none;
  padding: 30px 0;
  background-color: ${({ theme }) => theme.white};
`;

export const Container = styled.div`
  width: 60%;
`;

export const Header = styled.div`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 20px;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    font-size: 5vw;
  }
`;

export const Results = styled.div`
  margin-bottom: 15px;
`;

export const StyledPagesList = styled(PagesList)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
