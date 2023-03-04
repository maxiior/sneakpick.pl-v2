import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import TagsHolder from "./TagsHolder";
import { endpoints, routes } from "routes";

const Wrapper = styled.a`
  background-color: ${({ theme }) => theme.lightGrey};
  padding-bottom: 100%;
  cursor: pointer;
  position: relative;
  display: block;
`;

const Container = styled.div<{ image: string }>`
  position: absolute;
  width: 100%;
  height: 100%;

  background-image: url(${({ image }) => image});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Title = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  transition: opacity 0.3s;
  opacity: 0;
  text-align: justify;
  text-justify: inter-word;
`;

const Description = styled.div`
  font-size: 14px;
  text-align: justify;
  text-justify: inter-word;
  transition: opacity 0.3s;
  opacity: 0;

  padding-right: 10px;

  overflow-y: auto;
  max-height: 80%;

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    opacity: 0;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.white};
  }
`;

const Informations = styled.div<{ info: boolean }>`
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 15px;
  color: white;
  transition: background 0.3s;
  background: rgba(0, 180, 255, 0);

  :hover {
    background: rgba(
      ${({ info }) => (info ? "0, 180, 255, 0.9" : "221, 221, 221, 0.3")}
    );
  }

  :hover ${Title} {
    opacity: 1;
  }

  :hover ${Description} {
    opacity: 1;
  }
`;

const Name = styled.div`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  font-size: 12px;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin: 0 10px;
  text-align: justify;
  text-justify: inter-word;
`;

const NameHolder = styled.div`
  width: 100%;
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
`;

const SingleSteal = ({ data }: any) => {
  const {
    alert,
    category,
    markdown,
    description,
    rocket,
    header,
    link,
    photo,
  } = data;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Wrapper href={link} target="_blank">
        <Container
          image={photo && routes.DOMAIN + endpoints.STORES_IMAGES + photo}
        >
          <TagsHolder
            alert={alert}
            category={category}
            markdown={markdown}
            description={!!description}
            rocket={rocket}
          />
          <NameHolder>{header && <Name>{header}</Name>}</NameHolder>
        </Container>

        <Informations info={header && description}>
          {header && description && (
            <>
              <Title>{header}</Title>
              <Description>{description}</Description>
            </>
          )}
        </Informations>
      </Wrapper>
    </Grid>
  );
};

export default SingleSteal;
