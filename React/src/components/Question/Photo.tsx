import { useState } from "react";
import styled from "styled-components";
import { endpoints } from "routes";
import { VscChevronRight } from "react-icons/vsc";
import { getPhoto } from "functions/getPhoto";

const Wrapper = styled.div`
  min-width: 30%;
  margin: auto 0;
  background-color: ${({ theme }) => theme.grey};
`;

const Container = styled.div<{ photo?: string }>`
  padding-bottom: 75%;
  position: relative;
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

const Arrow = styled(VscChevronRight)<{ left?: boolean }>`
  font-size: 30px;
  transform: ${({ left }) => left && "rotate(180deg)"};
  color: ${({ theme }) => theme.veryDarkGrey};
`;

const ArrowHolder = styled.div<{ inactive?: boolean }>`
  background-color: ${({ theme }) => theme.white};
  visibility: ${({ inactive }) => inactive && "hidden"};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;

  :hover ${Arrow} {
    color: ${({ theme }) => theme.blue};
  }
`;

const Photo = () => {
  const [current, setCurrent] = useState(0);

  // <ArrowHolder inactive={current === 0}>
  //<ArrowHolder inactive={current === data.images?.length - 1}>

  return (
    <Wrapper>
      <Container
      // photo={data.images !== undefined ? data.images[current]?.file_name : ""}
      >
        <Holder>
          <ArrowHolder inactive={false}>
            <Arrow
              left
              onClick={() => {
                if (current > 0) setCurrent(current - 1);
              }}
            />
          </ArrowHolder>
          <ArrowHolder>
            <Arrow
              onClick={() => {
                //   if (current < data.images?.length - 1) setCurrent(current + 1);
              }}
            />
          </ArrowHolder>
        </Holder>
      </Container>
    </Wrapper>
  );
};

export default Photo;
