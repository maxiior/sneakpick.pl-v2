import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "routes";
import { name } from "constants/name";

const Wrapper = styled.div`
  width: 100%;
  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    display: flex;
  }
`;

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

  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    display: block;
  }
`;

const Holder = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    justify-content: center;
    text-align: center;
  }
`;

const Option = styled.li`
  color: ${({ theme }) => theme.white};
  text-decoration: none;

  :hover {
    color: ${({ theme }) => theme.blue};

    ::before {
      color: ${({ theme }) => theme.white};
    }
  }

  ::before {
    content: "|";
    padding: 0 5px;
  }
  :first-child::before {
    padding: 0;
    content: "";
  }
`;

const Copyright = styled.div`
  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 15px;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <Holder>
          <Option as={Link} to={routes.FAQ}>
            FAQ
          </Option>
          <Option as={Link} to={routes.SUPPORT}>
            SUPPORT
          </Option>
          <Option as={Link} to={routes.BUSINESSCONTACT}>
            BUSINESS CONTACT
          </Option>
        </Holder>
        <Copyright>COPYRIGHT 2022 BY {name}. ALL RIGHTS RESERVED.</Copyright>
      </Container>
    </Wrapper>
  );
};

export default Footer;
