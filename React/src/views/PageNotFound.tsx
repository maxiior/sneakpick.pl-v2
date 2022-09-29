import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "routes";
import { BsArrowUpRight } from "react-icons/bs";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  padding-top: 50px;

  @media only screen and (max-width: 993px) {
    width: 60%;
  }
`;

const Header = styled.div`
  font-size: 35px;
  font-weight: 500;

  @media only screen and (max-width: 993px) {
    font-size: 25px;
  }
`;

const Paragraph = styled.div`
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.blue};
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 10px 0px;
  font-size: 14px;
`;

const Arrow = styled(BsArrowUpRight)`
  margin-left: 5px;
`;

const PageNotFound = () => {
  return (
    <Wrapper>
      <Container>
        <div>
          <Header>Oops! Nie możemy znaleźć strony, której szukasz.</Header>
          <Paragraph>Poniżej znajdziesz kilka pomocnych linków:</Paragraph>
          <StyledLink to={routes.HOME}>
            Strona główna
            <Arrow />
          </StyledLink>
          <StyledLink to={routes.WTB + routes.DEFAULT_SEARCH}>
            Itemy
            <Arrow />
          </StyledLink>
          <StyledLink to={routes.SUPPORT}>
            Pomoc i kontakt
            <Arrow />
          </StyledLink>
        </div>
      </Container>
    </Wrapper>
  );
};

export default PageNotFound;
