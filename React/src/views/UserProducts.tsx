import styled from "styled-components";
import Items from "components/Profile/Items";
import ProfileTemplate from "templates/ProfileTemplate";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchItems, resetItems } from "store/profile/actions";
import { useAppSelector } from "hooks/useAppSelector";
import ItemsLoadingScreen from "components/common/ItemsLoadingScreen";

const NumberOfItems = styled.div`
  font-size: 20px;
  user-select: none;
`;

const Holder = styled.div`
  padding: 20px 0;
`;

const UserProducts = () => {
  const { items_results, items_pending } = useAppSelector(
    (state) => state.profileSlice
  );
  const { user } = useParams<{ user: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems(user!));

    return () => {
      dispatch(resetItems());
    };
  }, [dispatch, user]);

  return (
    <ProfileTemplate>
      <NumberOfItems>
        {items_results}{" "}
        {items_results === 1
          ? "przedmiot"
          : items_results % 10 === (3 || 4)
          ? "przedmioty"
          : "przedmiotów"}
      </NumberOfItems>
      <Holder>{items_pending ? <ItemsLoadingScreen /> : <Items />}</Holder>
    </ProfileTemplate>
  );
};

export default UserProducts;
