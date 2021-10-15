import styled from "styled-components";
import http from "api/http";
import { removeFollowedItem } from "store/followed/actions";
import { useDispatch } from "react-redux";
import { routes, endpoints } from "routes";

const Wrapper = styled.div`
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  :last-child {
    border: 0;
  }
`;

const Image = styled.div`
  height: 72px;
  min-width: 95px;
  cursor: pointer;
  object-fit: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Holder = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  justify-content: space-between;
`;

const Informations = styled.div`
  padding-right: 15px;
`;

const Price = styled.div`
  color: ${({ theme }) => theme.blue};
  text-align: right;
`;

const Options = styled.div`
  padding-top: 5px;
`;

const Option = styled.div`
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.veryDarkGrey};
  width: 100px;

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Name = styled.div``;

const Parameter = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  font-size: 12px;
`;

const Container = styled.div`
  padding-left: 15px;
  width: 100%;
`;

const FollowedItem = ({ name, size, condition, price, id, image }) => {
  const dispatch = useDispatch();

  const maxLength = (name) => {
    if (name.length > 30) return name.slice(0, 30) + "...";
    return name;
  };

  const getPhoto = (photo) => {
    return routes.DOMAIN + endpoints.IMAGES + photo;
  };

  const unfollow = () => {
    http
      .post(endpoints.FOLLOW + id, {})
      .then((response) => {
        dispatch(removeFollowedItem(id));
      })
      .catch(() => {});
  };

  return (
    <Wrapper>
      <Image
        style={{
          backgroundImage: `url(${getPhoto(image)})`,
        }}
      />
      <Container>
        <Holder>
          <Informations>
            <Name>{maxLength(name)}</Name>
            <Parameter>Rozmiar: {size}</Parameter>
            <Parameter>Stan: {condition}</Parameter>
          </Informations>
          <Price>{price}PLN</Price>
        </Holder>
        <Options>
          <Option onClick={() => unfollow()}>Usuń z obserwowanych</Option>
        </Options>
      </Container>
    </Wrapper>
  );
};

export default FollowedItem;
