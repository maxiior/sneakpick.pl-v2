import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getPhoto } from "functions/getPhoto";
import { iItem } from "types/item";
import { routes } from "routes";
import { RiArrowLeftRightLine } from "react-icons/ri";

const StyledLink = styled(Link)<{ unclickable: boolean }>`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  pointer-events: ${({ unclickable }) => unclickable && "none"};
`;

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.lightGrey};
  cursor: pointer;
  text-decoration: none;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Holder = styled.div`
  padding-bottom: 75%;
  box-sizing: border-box;
  resize: horizontal;
  max-width: 100%;
  padding: 10px 10px 0 10px;
  position: relative;
`;

const Condition = styled.div`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  padding: 3px 8px;
  border-radius: 5px;
  color: ${({ theme }) => theme.white};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.font_size_MD};
  margin-right: 3px;
`;

const Photo = styled.div<{ image: string }>`
  border: 1px solid ${({ theme }) => theme.lightGrey};
  width: 100%;
  object-fit: cover;
  padding-bottom: 75%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ image }) => image};
`;

const Informations = styled.div`
  color: ${({ theme }) => theme.veryDarkGrey};
  box-sizing: border-box;
  padding: 0 20px;
  width: 100%;
  height: 60px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
  }

  h2 {
    margin: 0;
    margin-top: -1px;
    font-size: ${({ theme }) => theme.font_size_MD};
    font-weight: 600;
    color: ${({ theme }) => theme.blue};
  }
`;

const IconsHolder = styled.div`
  margin-left: 10px;
  margin-top: 10px;

  position: absolute;
  display: flex;
  align-items: center;
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

const TradeIconHolder = styled.div`
  padding: 3px 8px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tradeColor};
  display: flex;
  align-items: center;
`;

const LaneHolder = styled.div`
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

const TradeIcon = styled(RiArrowLeftRightLine)`
  color: ${({ theme }) => theme.white};
`;

const SingleItem = ({ data }: { data?: iItem }) => {
  return (
    <Grid item xs={12} sm={6} lg={4} xl={3}>
      <StyledLink
        to={routes.ITEM.replace(":item", data ? data.id : "")}
        unclickable={!data}
      >
        <Container>
          <Holder>
            <IconsHolder>
              {data && <Condition>{data.condition}</Condition>}
              {data && data?.for_trade && (
                <TradeIconHolder>
                  <TradeIcon />
                </TradeIconHolder>
              )}
            </IconsHolder>
            {data ? (
              <Photo image={`url(${getPhoto(data?.images[0]?.file_name)})`} />
            ) : (
              <PhotoPlaceHolder />
            )}
          </Holder>
          <Informations>
            {data ? (
              <div>
                <h1>{data?.name}</h1>
                <h2>{data?.price} PLN + SHIP</h2>
              </div>
            ) : (
              <LaneHolder>
                <Lane />
                <Lane />
              </LaneHolder>
            )}
          </Informations>
        </Container>
      </StyledLink>
    </Grid>
  );
};

export default SingleItem;
