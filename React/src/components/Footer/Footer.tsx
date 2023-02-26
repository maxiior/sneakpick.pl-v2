import { Link } from "react-router-dom";
import { routes } from "routes";
import { name } from "constants/name";
import { Wrapper, Container, Holder, Option, Copyright } from "./styles";

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
