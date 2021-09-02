import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "routes";

const Container = styled.div`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  width: 100%;
  font-weight: 500;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 60px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.white};
  font-size: 12px;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const Options = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  @media only screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    text-align: center;
  }
`;

const Option = styled.li`
  display: inline-block;
  :first-child::before {
    content: "";
  }

  ::before {
    content: "|";
    padding: 0 5px;
  }
  :first-child::before {
    padding: 0;
  }
`;

const Copyright = styled.div`
  @media only screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 15px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  @media only screen and (max-width: 768px) {
    display: flex;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.white};
  text-decoration: none;

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <Options>
          <Option>
            <StyledLink to={routes.FAQ}>FAQ</StyledLink>
          </Option>
          <Option>
            <StyledLink to={routes.SUPPORT}>SUPPORT</StyledLink>
          </Option>
          <Option>
            <StyledLink to={routes.BUSINESSCONTACT}>
              BUSINESS CONTACT
            </StyledLink>
          </Option>
        </Options>
        <Copyright>COPYRIGHT 2021 BY SNEAKPICK. ALL RIGHTS RESERVED.</Copyright>
      </Container>
    </Wrapper>
  );
};

export default Footer;
