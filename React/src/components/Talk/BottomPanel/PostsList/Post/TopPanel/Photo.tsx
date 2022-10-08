import { useState } from "react";
import styled from "styled-components";
import { endpoints } from "routes";
import { VscChevronRight } from "react-icons/vsc";
import { getPhoto } from "functions/getPhoto";
import { IPost } from "../types/post";

const Wrapper = styled.div`
  min-width: 30%;
  padding: 10px;
  margin: auto 0;
`;

const Container = styled.div<{ photo: string }>`
  padding-bottom: 75%;
  position: relative;
  cursor: pointer;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: ${({ photo }) =>
    photo && `url(${getPhoto(photo, endpoints.QUESTIONS_IMAGES)})`};
`;

const Holder = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const Arrow = styled(VscChevronRight)<{ left?: boolean; inactive: boolean }>`
  font-size: 25px;
  transform: ${({ left }) => left && "rotate(180deg)"};
  cursor: pointer;
  color: ${({ theme }) => theme.veryDarkGrey};
  background-color: ${({ theme }) => theme.white};
  visibility: ${({ inactive }) => inactive && "hidden"};

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Photo = ({ data }: { data: IPost }) => {
  const [current, setCurrent] = useState(0);

  return (
    <Wrapper>
      <Container
        photo={data.images !== undefined ? data.images[current]?.file_name : ""}
      >
        <Holder>
          <Arrow
            inactive={current === 0}
            left
            onClick={() => {
              if (current > 0) setCurrent(current - 1);
            }}
          />
          <Arrow
            inactive={current === data.images?.length - 1}
            onClick={() => {
              if (current < data.images?.length - 1) setCurrent(current + 1);
            }}
          />
        </Holder>
      </Container>
    </Wrapper>
  );
};

export default Photo;
