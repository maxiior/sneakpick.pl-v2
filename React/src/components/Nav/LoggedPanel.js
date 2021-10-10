import styled, { css } from "styled-components";
import { RiAccountCircleLine } from "react-icons/ri";
import { GrStar } from "react-icons/gr";
import { RiNotification4Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { routes } from "routes";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/auth/actions";
import FollowedPanel from "./LoggedPanel/FollowedPanel/";
import NotificationsPanel from "./LoggedPanel/NotificationsPanel";

const Wrapper = styled.div`
  display: inline-grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 12px;
  height: 100%;
  padding-left: 20px;
`;

const ProfileIcon = styled(RiAccountCircleLine)`
  color: ${({ theme }) => theme.veryDarkGrey};
  font-size: 22px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.white};
  border-radius: 50%;
  padding: 5px;
  box-sizing: content-box;

  :hover {
    background-color: ${({ theme }) => theme.lightGrey};
  }
`;

const StarIcon = styled(GrStar)`
  color: ${({ theme }) => theme.veryDarkGrey};
  font-size: 22px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.white};
  border-radius: 50%;
  padding: 5px;
  box-sizing: content-box;

  :hover {
    background-color: ${({ theme }) => theme.lightGrey};
  }
`;

const NotificationIcon = styled(RiNotification4Fill)`
  color: ${({ theme }) => theme.veryDarkGrey};
  font-size: 22px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.white};
  border-radius: 50%;
  padding: 5px;
  box-sizing: content-box;

  :hover {
    background-color: ${({ theme }) => theme.lightGrey};
  }
`;

const ProfilePanel = styled.div`
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

  :hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }

  :last-child {
    border-top: 1px solid ${({ theme }) => theme.grey};
  }
`;

const StyledFollowedPanel = styled(FollowedPanel)``;

const StyledNotificationsPanel = styled(NotificationsPanel)``;

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  ${({ profile }) =>
    profile &&
    css`
      :hover ${ProfilePanel} {
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

const LoggedPanel = () => {
  const { user_id } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Container profile>
        <StyledLink to={routes.DEFAULT_PROFILE + user_id}>
          <ProfileIcon />
        </StyledLink>
        <ProfilePanel>
          <Option to={routes.DEFAULT_PROFILE + user_id}>Moje konto</Option>
          <Option>Zamówienia</Option>
          <Option to={routes.SUPPORT}>Pomoc i kontakt</Option>
          <Option to={routes.PROFILE_SETTINGS}>Ustawienia</Option>
          <Option onClick={() => dispatch(logout())}>Wyloguj się</Option>
        </ProfilePanel>
      </Container>
      <Container followed>
        <StarIcon />
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
