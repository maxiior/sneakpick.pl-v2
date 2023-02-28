import styled from "styled-components";
import { endpoints } from "routes";
import { getPhoto } from "functions/getPhoto";
import { IPost } from "../types/post";
import { Link } from "react-router-dom";
import { routes } from "routes";

const Wrapper = styled(Link)`
  min-width: 30%;
  padding: 10px;
  margin: auto 0;
`;

const Container = styled.div<{ photo: string }>`
  padding-bottom: 75%;
  position: relative;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: ${({ photo }) =>
    photo && `url(${getPhoto(photo, endpoints.QUESTIONS_IMAGES)})`};
`;

const Photo = ({ data }: { data: IPost }) => {
  return (
    <Wrapper to={routes.QUESTION.replace(":id", data.id)}>
      <Container
        photo={data.images !== undefined ? data.images[0]?.file_name : ""}
      ></Container>
    </Wrapper>
  );
};

export default Photo;
