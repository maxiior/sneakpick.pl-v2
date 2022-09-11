import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

const Wrapper = styled(Grid)`
  padding: 8px !important;
  :last-child {
    padding-right: 1px !important;
  }
`;

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.lightGrey};
  width: 100%;
  height: 100%;
  position: relative;
`;

const View = styled.div`
  padding-bottom: 75%;
  max-width: 100%;
  padding: 10px 10px 0 10px;
  position: relative;
`;

const PhotoPlaceHolder = styled.div`
  background-color: ${({ theme }) => theme.lightGrey};
  padding-bottom: 75%;
  width: 100%;

  animation: loading 1s linear infinite alternate;

  @keyframes loading {
    0% {
      background-color: ${({ theme }) => theme.lightGrey};
    }
    100% {
      background-color: ${({ theme }) => theme.grey};
    }
  }
`;

const Informations = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Holder = styled.div`
  width: 100%;
`;

const Lane = styled.div`
  width: 100%;
  height: 15px;
  background-color: ${({ theme }) => theme.lightGrey};

  :last-child {
    margin-top: 10px;
  }

  animation: loading 1s linear infinite alternate;

  @keyframes loading {
    0% {
      background-color: ${({ theme }) => theme.lightGrey};
    }
    100% {
      background-color: ${({ theme }) => theme.grey};
    }
  }
`;

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
