import { getPhoto } from "functions/getPhoto";
import { iItem } from "types/item";
import { routes, endpoints } from "routes";
import {
  Wrapper,
  StyledLink,
  Container,
  View,
  State,
  Photo,
  Informations,
} from "./styled";

const Item = ({ data }: { data: iItem }) => {
  return (
    <Wrapper item xs={2} sm={2} md={2} lg={2} xl={2}>
      <StyledLink to={routes.ITEM.replace(":item", data.id)}>
        <Container>
          <View>
            <State>{data.condition}</State>
            <Photo
              photo={getPhoto(
                data.images[0]?.file_name,
                endpoints.ITEMS_IMAGES
              )}
            ></Photo>
          </View>
          <Informations>
            <div>
              <h1>{data.name}</h1>
              <h2>{data.price} PLN + SHIP</h2>
            </div>
          </Informations>
        </Container>
      </StyledLink>
    </Wrapper>
  );
};

export default Item;
