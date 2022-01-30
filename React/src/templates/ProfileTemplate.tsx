import React, { useEffect } from "react";
import styled from "styled-components";
import TopPanel from "components/Profile/TopPanel";
import { Link } from "react-router-dom";
import { routes } from "routes";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch } from "hooks/useAppDispatch";
//import { closeProfilePopup } from "store/interface/actions";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 80%;
`;

const BottomPanel = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.grey};
`;

const Label = styled(Link)<{ unactive?: boolean }>`
  background-color: ${({ theme, unactive }) =>
    unactive ? theme.grey : theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  padding: 10px 30px;
  font-size: 16px;
  width: 200px;
  text-align: center;
  margin-top: -1px;
  margin-bottom: 20px;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  align-items: center;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 993px) {
    width: 100%;
    font-size: 14px;
  }
`;

const Holder = styled.div`
  display: flex;

  @media only screen and (max-width: 993px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const ProfileTemplate = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user }: { user: string } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    //dispatch(closeProfilePopup());
  }, [location, dispatch]);

  return (
    <Wrapper>
      <Container>
        <TopPanel />
        <BottomPanel>
          <Holder>
            <Label
              to={routes.USER_PROFILE_PRODUCTS.replace(":user", user)}
              unactive={location.pathname.indexOf("comments") > -1}
            >
              Moje produkty
            </Label>
            <Label
              to={routes.USER_PROFILE_COMMENTS.replace(":user", user)}
              unactive={location.pathname.indexOf("products") > -1}
            >
              Komentarze
            </Label>
          </Holder>
          {children}
        </BottomPanel>
      </Container>
    </Wrapper>
  );
};

export default ProfileTemplate;
