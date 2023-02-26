import { Link } from "react-router-dom";
import { Wrapper, Image } from "./styles";
import { routes } from "routes";
import logo from "assets/logo.png";

const Logo = () => {
  return (
    <Wrapper>
      <Link to={routes.HOME}>
        <Image src={logo} />
      </Link>
    </Wrapper>
  );
};

export default Logo;
