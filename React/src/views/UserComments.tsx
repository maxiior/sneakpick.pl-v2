import React, { useState, useRef } from "react";
import ProfileTemplate from "templates/ProfileTemplate";
import styled from "styled-components";
import SingleComment from "components/UserComments/SingleComment";
import RatingPanel from "components/UserComments/RatingPanel";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { fetchComments, resetComments } from "store/profile/actions";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import CommentsLoadingScreen from "components/UserComments/CommentsLoadingScreen";
import LoadingIcon from "components/common/LoadingIcon";

const Button = styled.div`
  user-select: none;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.blue};
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.font_size_MD};

  @media only screen and (max-width: 993px) {
    width: 100%;
  }

  :hover {
    opacity: 0.9;
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const NumberOfComments = styled.div`
  font-size: 20px;
  user-select: none;
  margin-bottom: 20px;
`;

const Blank = styled.div`
  text-align: center;
  font-size: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_XL}) {
    padding: 100px 0;
  }
`;

const Holder = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

const UserComments: React.FC = () => {
  const [ratingPanel, setRatingPanel] = useState(false);
  const { user } = useParams<{ user: string }>();
  const ratingPanelRequest = useLocation().state;
  const dispatch = useAppDispatch();
  const ref: any = useRef(null);

  const {
    comments_count,
    comments,
    init_pending,
    all_loaded,
    reloading_pending,
  } = useAppSelector((state) => state.profileSlice);
  const { user_id, isAuthenticated } = useAppSelector(
    (state) => state.authSlice
  );

  const bottomScrollDetection = () => {
    const position = window.scrollY;
    var limit = document.body.offsetHeight - window.innerHeight;
    if (position === limit)
      dispatch(fetchComments({ user: user!, reloading: true }));
  };

  useEffect(() => {
    if (!all_loaded) {
      if (init_pending)
        dispatch(fetchComments({ user: user!, reloading: false }));
      else document.addEventListener("scroll", bottomScrollDetection);
      return () =>
        document.removeEventListener("scroll", bottomScrollDetection);
    }
  }, [all_loaded, init_pending]);

  useEffect(() => {
    return () => {
      dispatch(resetComments());
    };
  }, []);

  useEffect(() => {
    if (ratingPanelRequest?.state === "open_rating_panel") {
      setRatingPanel(true);
      ref?.current?.scrollIntoView();
    }
  }, [ratingPanelRequest]);

  return (
    <ProfileTemplate>
      {user_id !== user && isAuthenticated && (
        <>
          {!ratingPanel ? (
            <Button ref={ref} onClick={() => setRatingPanel(true)}>
              Oceń użytkownika
            </Button>
          ) : (
            <RatingPanel setRatingPanel={setRatingPanel} />
          )}
        </>
      )}
      <Wrapper>
        {init_pending ? (
          <CommentsLoadingScreen />
        ) : (
          <>
            <NumberOfComments>
              {comments_count}{" "}
              {comments_count === 1
                ? "komentarz"
                : comments_count % 10 === (2 || 3 || 4)
                ? "komentarze"
                : "komentarzy"}
            </NumberOfComments>
            {comments_count > 0 ? (
              comments.map((e) => <SingleComment data={e} user={user!} />)
            ) : (
              <Blank>Ten użytkownik nie posiada żadnych komentarzy.</Blank>
            )}
          </>
        )}
        {reloading_pending && (
          <Holder>
            <LoadingIcon />
          </Holder>
        )}
      </Wrapper>
    </ProfileTemplate>
  );
};

export default UserComments;
