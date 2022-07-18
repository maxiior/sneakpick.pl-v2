import styled from "styled-components";
import Items from "components/Profile/Items";
import ProfileTemplate from "templates/ProfileTemplate";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchItems } from "store/profile/actions";
import { useAppSelector } from "hooks/useAppSelector";

const NumberOfItems = styled.div`
  font-size: 20px;
  user-select: none;
`;

const UserProducts = () => {
  const { items_results } = useAppSelector((state) => state.profileSlice);
  const { user }: { user: string } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems(user));
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
      <Items />
    </ProfileTemplate>
  );
};

export default UserProducts;
