import { useEffect, useRef } from "react";
import styled from "styled-components";
import { fetchFollowers, fetchFollowing } from "store/profile/actions";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useAppSelector } from "hooks/useAppSelector";
import Follower from "components/Profile/Popup/Follower";
import { useDetectOutsideClick } from "hooks/useDetectOutsideClick";
import { closeProfilePopup } from "store/interface/actions";

const Wrapper = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-height: 435px) {
    padding: 30px 0;
    align-items: unset;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.white};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
  height: 400px;
  width: 400px;
  position: relative;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_SM}) {
    width: 80%;
  }
`;

const CLose = styled(IoMdClose)`
  right: 10px;
  top: 10px;
  cursor: pointer;
  position: absolute;
  color: ${({ theme }) => theme.veryDarkGrey};

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Header = styled.div`
  padding: 15px 0px;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
`;

const List = styled.div`
  max-height: 350px;
  overflow-y: auto;
  padding: 5px 0px;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.grey};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.blue};
  }
`;

const Information = styled.div`
  font-size: 14px;
  text-align: center;
  padding: 15px 0px;
`;

const Popup = () => {
  const dispatch = useDispatch();

  const auth = useAppSelector((state) => state.authSlice);
  const { profilePopup } = useAppSelector((state) => state.interfaceSlice);

  const { followers_details, id, following_details } = useAppSelector(
    (state) => state.profileSlice.user
  );
  const wrapperRef = useRef(null);
  useDetectOutsideClick(wrapperRef, () => {
    dispatch(closeProfilePopup());
  });

  useEffect(() => {
    if (profilePopup === 1) dispatch(fetchFollowers(id));
    else dispatch(fetchFollowing(id));
  }, [dispatch, id, profilePopup]);

  console.log(following_details.length);

  return (
    <Wrapper>
      <Container ref={wrapperRef}>
        <CLose onClick={() => dispatch(closeProfilePopup())} />
        <Header>{profilePopup === 1 ? "Obserwujący" : "Obserwowani"}</Header>
        <List>
          {profilePopup === 1 ? (
            followers_details.length > 0 ? (
              followers_details.map((e) => (
                <Follower data={e} auth={auth} popup={profilePopup} />
              ))
            ) : (
              <Information>
                Ten użytkownik nie posiada obserwujących.
              </Information>
            )
          ) : following_details.length > 0 ? (
            following_details.map((e) => (
              <Follower data={e} auth={auth} popup={profilePopup} />
            ))
          ) : (
            <Information>Ten użytkownik nikogo nie obserwuje.</Information>
          )}
        </List>
      </Container>
    </Wrapper>
  );
};

export default Popup;
