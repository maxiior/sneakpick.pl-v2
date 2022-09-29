import { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { VscChevronRight } from "react-icons/vsc";
import { routes } from "routes";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  width: 100%;
  z-index: 1;

  @media only screen and (min-width: ${({ theme }) => theme.min_width_MD}) {
    display: none;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
`;

const Option = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  display: block;
  margin-bottom: 15px;

  :hover {
    color: ${({ theme }) => theme.blue};
  }

  &.active {
    color: ${({ theme }) => theme.blue};
  }
`;

const Arrow = styled(VscChevronRight)<{ turned: boolean }>`
  display: inline-block;
  transition-duration: 0.5s;
  font-size: 20px;
  color: ${({ theme }) => theme.black};
  margin-left: 5px;
  transform: ${({ turned }) => (turned ? "rotate(-90deg)" : "rotate(90deg)")};
`;

const Header = styled.div`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Holder = styled.div`
  margin-bottom: 40px;
`;

const MobileMenu = () => {
  const [open, setOpen] = useState(true);
  return (
    <Wrapper>
      <Menu>
        <Holder>
          <Header onClick={() => setOpen((state) => !state)}>
            Ustawienia
            <Arrow turned={open} />
          </Header>
          {open && (
            <>
              <Option to={routes.PROFILE_SETTINGS}>Szczegóły profilu</Option>
              <Option to={routes.ACCOUNT_SETTINGS}>Ustawienia konta</Option>
            </>
          )}
        </Holder>
      </Menu>
    </Wrapper>
  );
};

export default MobileMenu;
