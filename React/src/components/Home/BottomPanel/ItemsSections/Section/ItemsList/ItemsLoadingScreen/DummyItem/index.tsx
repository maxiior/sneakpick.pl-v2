import {
  Wrapper,
  Container,
  View,
  PhotoPlaceHolder,
  Informations,
  Holder,
  Lane,
} from "./styled";

const DummyItem = () => {
  return (
    <Wrapper item xs={2} sm={2} md={2} lg={2} xl={2}>
      <Container>
        <View>
          <PhotoPlaceHolder />
        </View>
        <Informations>
          <Holder>
            <Lane />
            <Lane />
          </Holder>
        </Informations>
      </Container>
    </Wrapper>
  );
};

export default DummyItem;
