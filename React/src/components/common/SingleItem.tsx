import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getPhoto } from "functions/getPhoto";
import { iItem } from "types/item";
import { routes } from "routes";

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.lightGrey};
  cursor: pointer;
  text-decoration: none;
  width: 100%;
  height: 100%;
  position: relative;
  /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
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
  margin-left: 10px;
  margin-top: 10px;
  font-size: 14px;
  position: absolute;
  background-color: ${({ theme }) => theme.veryDarkGrey};
  padding: 2px 8px;
  border-radius: 3px;
  color: ${({ theme }) => theme.white};
  text-transform: uppercase;
`;

const Photo = styled.div`
  border: 1px solid ${({ theme }) => theme.lightGrey};
  width: 100%;
  object-fit: cover;
  padding-bottom: 75%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
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
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.blue};
  }
`;

const SingleItem = ({ data }: { data: iItem }) => {
  return (
    <Grid item xs={12} sm={6} lg={4} xl={3}>
      <StyledLink to={`../..` + routes.ITEM.replace(":item", data.id)}>
        <Container>
          <Holder>
            <Condition>{data.condition}</Condition>
            <Photo
              style={{
                backgroundImage: `url(${getPhoto(data.images[0]?.file_name)})`,
              }}
            ></Photo>
          </Holder>
          <Informations>
            <div>
              <h1>{data.name}</h1>
              <h2>{data.price} PLN + SHIP</h2>
            </div>
          </Informations>
        </Container>
      </StyledLink>
    </Grid>
  );
};

export default SingleItem;
