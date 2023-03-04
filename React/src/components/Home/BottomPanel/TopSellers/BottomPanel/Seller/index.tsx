import Avatar from "./Avatar";
import defaultUserPicture from "assets/svg/default_user_picture.svg";
import Rating from "./Rating";
import { routes } from "routes";
import {
  Wrapper,
  LeftHolder,
  Number,
  NameHolder,
  Name,
  Paragraph,
  RightHolder,
  Value,
  ValueHolder,
} from "./styled";

const Seller = ({ number }: { number: number }) => {
  return (
    <Wrapper
      to={routes.USER_PROFILE_PRODUCTS.replace(
        ":user",
        "79260c70-adc6-4729-948b-6d5b784cfa96"
      )}
    >
      <LeftHolder>
        <Number>{number}</Number>
        <Avatar rating={4.77} photo={defaultUserPicture} />
        <NameHolder>
          <Name>Maksim Brzezinski</Name>
          <Paragraph right>23 przedmioty</Paragraph>
        </NameHolder>
      </LeftHolder>
      <RightHolder>
        <Value>32</Value>
        <Value>
          <ValueHolder>
            <Rating rating={1} />
            <Paragraph>4.77</Paragraph>
          </ValueHolder>
        </Value>
      </RightHolder>
    </Wrapper>
  );
};

export default Seller;
