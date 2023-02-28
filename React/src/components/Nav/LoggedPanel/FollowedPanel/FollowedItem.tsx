import styled from "styled-components";
import { removeFollowedItem } from "store/followed/actions";
import { getPhoto } from "functions/getPhoto";
import { iFollowed } from "types/Nav/LoggedPanel/FollowedPanel/followed";
import { Link } from "react-router-dom";
import { routes } from "routes";
import { useAppDispatch } from "hooks/useAppDispatch";
import { endpoints } from "routes";

const Wrapper = styled.div`
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  :last-child {
    border: 0;
  }
`;

const Image = styled(Link)<{ photo: string }>`
  height: 72px;
  min-width: 95px;
  cursor: pointer;
  object-fit: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  background-image: ${({ photo }) => photo && `url(${photo})`};
`;

const Container = styled.div`
  padding-left: 15px;
  width: 100%;
`;

const Holder = styled(Link)`
  display: flex;
  width: 100%;
  cursor: pointer;
  justify-content: space-between;
  text-decoration: none;
`;

const Informations = styled.div`
  padding-right: 15px;
`;

const Name = styled.div`
  color: ${({ theme }) => theme.black};
`;

const Parameter = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  font-size: 12px;
`;

const Price = styled.div`
  color: ${({ theme }) => theme.blue};
  text-align: right;
`;

const Options = styled.div`
  padding-top: 5px;
`;

const Option = styled.div`
  font-size: ${({ theme }) => theme.font_size_MD};
  cursor: pointer;
  color: ${({ theme }) => theme.veryDarkGrey};
  width: 100px;

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const FollowedItem = ({ data }: { data: iFollowed }) => {
  const dispatch = useAppDispatch();

  const maxLength = (name: string) => {
    if (name.length > 30) return name.slice(0, 30) + "...";
    return name;
  };

  const unfollow = () => {
    dispatch(removeFollowedItem(data.id))
      .then(() => {})
      .catch(() => {});
  };

  return (
    <Wrapper>
      <Image
        to={routes.ITEM.replace(":item", data.id)}
        photo={getPhoto(data.images[0]?.file_name, endpoints.ITEMS_IMAGES)}
      />
      <Container>
        <Holder to={routes.ITEM.replace(":item", data.id)}>
          <Informations>
            <Name>{maxLength(data.name)}</Name>
            <Parameter>Rozmiar: {data.size.toUpperCase()}</Parameter>
            <Parameter>Stan: {data.condition.toUpperCase()}</Parameter>
          </Informations>
          <Price>{data.price}PLN</Price>
        </Holder>
        <Options>
          <Option onClick={() => unfollow()}>Usuń z obserwowanych</Option>
        </Options>
      </Container>
    </Wrapper>
  );
};

export default FollowedItem;
