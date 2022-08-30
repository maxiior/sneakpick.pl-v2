import React, { useState, useRef } from "react";
import ProfileTemplate from "templates/ProfileTemplate";
import styled from "styled-components";
import SingleComment from "components/UserComments/SingleComment";
import RatingPanel from "components/UserComments/RatingPanel";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { fetchComments } from "store/profile/actions";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const Button = styled.div`
  user-select: none;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.blue};
  padding: 10px 20px;
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

const UserComments: React.FC = () => {
  const [ratingPanel, setRatingPanel] = useState(false);
  const { user }: { user: string } = useParams();
  const ratingPanelRequest = useLocation().state;
  const dispatch = useAppDispatch();
  const ref: any = useRef(null);

  const { comments_count, comments } = useAppSelector(
    (state) => state.profileSlice
  );
  const { user_id, isAuthenticated } = useAppSelector(
    (state) => state.authSlice
  );

  useEffect(() => {
    dispatch(fetchComments(user));
  }, [dispatch, user]);

  useEffect(() => {
    if (ratingPanelRequest === "open_rating_panel") {
      setRatingPanel(true);
      ref.current.scrollIntoView();
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
        <NumberOfComments>
          {comments_count}{" "}
          {comments_count === 1
            ? "komentarz"
            : comments_count % 10 === (2 || 3 || 4)
            ? "komentarze"
            : "komentarzy"}
        </NumberOfComments>
        {comments_count > 0 ? (
          comments.map((e) => <SingleComment data={e} user={user} />)
        ) : (
          <Blank>Ten użytkownik nie posiada żadnych komentarzy.</Blank>
        )}
      </Wrapper>
    </ProfileTemplate>
  );
};

export default UserComments;
