import styled, { css } from "styled-components";
import { BiUser } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";
import { GrNotification } from "react-icons/gr";
import { Link } from "react-router-dom";
import { routes } from "routes";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { logout } from "store/auth/actions";
import FollowedPanel from "../LoggedPanel/FollowedPanel";
import NotificationsPanel from "../LoggedPanel/NotificationsPanel";

const Wrapper = styled.div`
  display: inline-grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 12px;
  height: 100%;
  padding-left: 20px;

  @media only screen and (max-width: 768px) {
    column-gap: 6px;
  }
`;

const Container = styled.div<{
  profile?: boolean;
  followed?: boolean;
  notifications?: boolean;
}>`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  ${({ profile }) =>
    profile &&
    css`
      :hover ${Holder} {
        display: block;
      }
    `}

  ${({ followed }) =>
    followed &&
    css`
      :hover ${StyledFollowedPanel} {
        display: block;
      }
    `}
  
  ${({ notifications }) =>
    notifications &&
    css`
      :hover ${StyledNotificationsPanel} {
        display: block;
      }
    `}
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const ProfileIcon = styled(BiUser)`
  color: ${({ theme }) => theme.white};
  font-size: 25px;
  cursor: pointer;
  padding: 5px;
  box-sizing: content-box;

  :hover {
    opacity: 0.9;
  }
`;

const Holder = styled.div`
  background-color: ${({ theme }) => theme.white};
  position: absolute;
  top: 60px;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: none;
`;

const Option = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  display: block;
  color: ${({ theme }) => theme.veryDarkGrey};
  text-decoration: none;
  font-size: ${({ theme }) => theme.font_size_MD};

  :hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }

  :last-child {
    border-top: 1px solid ${({ theme }) => theme.grey};
  }
`;

const HeartIcon = styled(BiHeart)`
  color: ${({ theme }) => theme.white};
  font-size: 25px;
  cursor: pointer;
  padding: 5px;
  box-sizing: content-box;

  :hover {
    opacity: 0.9;
  }
`;

const StyledFollowedPanel = styled(FollowedPanel)``;

const NotificationIcon = styled(GrNotification)`
  font-size: 25px;
  cursor: pointer;
  padding: 5px;
  box-sizing: content-box;

  :hover {
    opacity: 0.9;
  }

  path {
    stroke: white;
  }
`;

const StyledNotificationsPanel = styled(NotificationsPanel)``;

const LoggedPanel = () => {
  const { user_id } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <Container profile>
        <StyledLink to={routes.USER_PROFILE_PRODUCTS.replace(":user", user_id)}>
          <ProfileIcon />
        </StyledLink>
        <Holder>
          <Option to={routes.USER_PROFILE_PRODUCTS.replace(":user", user_id)}>
            Moje konto
          </Option>
          <Option to={routes.ORDERS}>Zamówienia</Option>
          <Option to={routes.SUPPORT}>Pomoc i kontakt</Option>
          <Option to={routes.PROFILE_SETTINGS}>Ustawienia</Option>
          <Option to={routes.HOME} onClick={() => dispatch(logout())}>
            Wyloguj się
          </Option>
        </Holder>
      </Container>
      <Container followed>
        <StyledLink to={routes.FOLLOWED}>
          <HeartIcon />
        </StyledLink>
        <StyledFollowedPanel />
      </Container>
      <Container notifications>
        <NotificationIcon />
        <StyledNotificationsPanel />
      </Container>
    </Wrapper>
  );
};

export default LoggedPanel;
