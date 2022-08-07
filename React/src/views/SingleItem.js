import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "api/http";
import styled from "styled-components";
import Path from "components/SingleItem/Path";
import Images from "components/SingleItem/Images";
import SimilarItems from "components/SingleItem/SimilarItems";
import { endpoints } from "routes";
import { addFollowedItem, removeFollowedItem } from "store/followed/actions";
import { useDispatch, useSelector } from "react-redux";
import Informations from "components/SingleItem/Informations";
import { fetchSingleItem } from "api/services/items.service";

const Wrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 80%;
  padding: 30px 0;
`;

const Header = styled.header`
  text-align: left;
  width: 100%;
  color: ${({ theme }) => theme.veryDarkGrey};
  font-size: 2em;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    font-size: 1.5em;
  }
`;

const Condition = styled.div`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  padding: 5px 10px;
  font-size: 12px;
  border-radius: ${({ theme }) => theme.radious_SM};
  display: flex;
  align-items: center;
  user-select: none;
  margin-left: 15px;
`;

const Option = styled.div`
  background-color: ${({ theme, active }) =>
    active ? theme.grey : theme.blue};
  color: ${({ theme }) => theme.white};
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radious_SM};
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  margin-right: 10px;
  font-size: 14px;

  :hover {
    opacity: 0.9;
  }
`;

const Holder = styled.div`
  display: flex;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    margin: 10px 0;
  }
`;

const TopPanel = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
  padding-bottom: 30px;
  border-bottom: 1px solid ${({ theme }) => theme.lightGrey};

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    display: block;
  }
`;

const TopLeft = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    justify-content: center;
  }
`;

const TopRight = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    justify-content: center;
  }
`;

const Panel = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_XL}) {
    justify-content: center;
  }
`;

const NumberOfBumps = styled.div`
  color: ${({ theme }) => theme.blue};
  font-size: 20px;
  user-select: none;
`;

const LeftPanel = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_XL}) {
    width: 90%;
  }
  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    width: 100%;
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInformations = styled(Informations)`
  @media only screen and (min-width: 1201px) {
    display: ${({ mobile }) => (mobile ? "none" : "block")};
  }

  @media only screen and (max-width: 1200px) {
    display: ${({ mobile }) => (mobile ? "flex" : "none")};
  }
`;

const SingleItem = () => {
  const { item } = useParams();
  const [data, setData] = useState({ product: {} });
  const dispatch = useDispatch();
  const followedItems = useSelector((state) => state.followedSlice.items);
  const [isFollowed, setIsFollowed] = useState(false);
  const { isAuthenticated, user_id } = useSelector((state) => state.authSlice);

  const bump = () => {
    http
      .post(endpoints.BUMP.replace("{id}", data.product.id), {})
      .then((response) => {
        setData({
          product: {
            ...data.product,
            total_bumps: response.data.total_bumps,
            is_bumped: true,
          },
        });
      })
      .catch(() => {});
  };

  const checkIfFollowed = () => {
    let check = false;
    followedItems.forEach((e) => {
      if (e.id === data.product.id) check = true;
    });
    if (check) return true;
    else return false;
  };

  const follow = () => {
    http
      .post(endpoints.FOLLOWED_ITEMS, { id: data.product.id })
      .then(() => {
        dispatch(
          addFollowedItem({
            name: data.product.name,
            size: data.product.size,
            condition: data.product.condition,
            id: data.product.id,
            price: data.product.price,
            photo: data.product.images,
          })
        );
        setIsFollowed(true);
      })
      .catch(() => {});
  };

  const unfollow = () => {
    dispatch(removeFollowedItem(data.product.id))
      .then(() => {
        setIsFollowed(false);
      })
      .catch(() => {});
  };

  const resolution = (table) => {
    let date = "";
    table.forEach((e) => {
      date += e + ".";
    });
    return date.substr(0, 10);
  };

  useEffect(() => {
    fetchSingleItem(item).then((response) => {
      setData({
        product: {
          ...response.data,
          published: resolution(
            response.data.published.substr(0, 10).split("-").reverse()
          ),
        },
      });
    });
  }, []);

  useEffect(() => {
    if (checkIfFollowed()) setIsFollowed(true);
    else setIsFollowed(false);
  }, [data, followedItems]);

  return (
    <Wrapper>
      <Container>
        <Path category={data.product.category} brand={data.product.brand} />
        <TopPanel>
          <TopLeft>
            <Holder>
              <Header>{data.product.name}</Header>
              <Center>
                <Condition>{data.product.condition?.toUpperCase()}</Condition>
              </Center>
            </Holder>
          </TopLeft>
          <TopRight>
            {isAuthenticated &&
              data.product.owner !== undefined &&
              data.product.owner !== user_id && (
                <Option
                  active={isFollowed}
                  onClick={() => (isFollowed ? unfollow() : follow())}
                >
                  {isFollowed ? "Unfollow" : "Follow"}
                </Option>
              )}
            {data.product.is_bumped !== undefined && (
              <>
                <Option onClick={() => bump()} active={data.product.is_bumped}>
                  Bump
                </Option>
                <NumberOfBumps>+{data.product.total_bumps}</NumberOfBumps>
              </>
            )}
          </TopRight>
        </TopPanel>
        <Panel>
          <LeftPanel>
            <Images images={data.product.images} />
          </LeftPanel>
          <StyledInformations data={data} owner={user_id} />
        </Panel>
        <StyledInformations data={data} mobile owner={user_id} />
        <SimilarItems />
      </Container>
    </Wrapper>
  );
};

export default SingleItem;
