import React, { useEffect } from "react";
import styled from "styled-components";
import Post from "./Post";
import LoadingScreen from "./LoadingScreen";
import { useLocation } from "react-router-dom";
import { fetchQuestions, resetAllLoaded } from "store/talk/actions";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { useSearchParams } from "react-router-dom";
import LoadingIcon from "components/common/LoadingIcon";
import { useNavigate } from "react-router-dom";
import { routes } from "routes";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";

const Wrapper = styled.div`
  width: 60%;
  padding: 20px;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    width: 100%;
  }
`;

const Blank = styled.div`
  text-align: center;
  font-size: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Holder = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Button = styled(Link)`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  font-size: 14px;
  padding: 12px 30px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 20px;

  @media only screen and (min-width: ${({ theme }) => theme.min_width_LG}) {
    display: none;
  }

  :hover {
    opacity: 0.9;
  }
`;

const PlusIcon = styled(BiPlus)`
  font-size: 22px;
`;

const PostsList = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { questions, init_pending, all_loaded, reloading_pending } =
    useAppSelector((state) => state.talkSlice);
  const [searchParams, _] = useSearchParams();

  const checkURL = () => {
    searchParams.forEach((_, key) => {
      if (!["category", "ordering"].includes(key))
        navigate(routes.TALK_DEFAULT_SEARCH);
    });
  };

  const fetch = (reloading: boolean) => {
    checkURL();
    let filters = "ordering=";
    const ordering = searchParams.get("ordering");
    filters += ordering ? ordering : "0";
    const category = searchParams.get("category");
    if (category) filters += "&category=" + category;

    dispatch(fetchQuestions({ reloading, filters }));
  };

  const bottomScrollDetection = () => {
    const position = window.scrollY;
    var limit = document.body.offsetHeight - window.innerHeight;
    if (position === limit) fetch(true);
  };

  useEffect(() => {
    dispatch(resetAllLoaded());
    document.removeEventListener("scroll", bottomScrollDetection);
  }, [location.search]);

  useEffect(() => {
    if (!all_loaded) {
      fetch(false);
      document.addEventListener("scroll", bottomScrollDetection);
      return () =>
        document.removeEventListener("scroll", bottomScrollDetection);
    }
  }, [all_loaded, location.search]);

  useEffect(() => {
    return () => {
      document.removeEventListener("scroll", bottomScrollDetection);
      // dispatch(resetAllLoaded());
    };
  }, []);

  return (
    <Wrapper>
      <Button to={routes.ADD_QUESTION}>
        <PlusIcon />
        <div>Dodaj pytanie</div>
      </Button>
      {init_pending ? (
        <LoadingScreen />
      ) : (
        <>
          {questions.length === 0 ? (
            <Blank>Brak wyników wyszukiwania dla wprowadzonych danych.</Blank>
          ) : (
            <>
              {questions.map((e: any) => (
                <Post data={e} />
              ))}
            </>
          )}
        </>
      )}
      {reloading_pending && (
        <Holder>
          <LoadingIcon />
        </Holder>
      )}
    </Wrapper>
  );
};

export default PostsList;
