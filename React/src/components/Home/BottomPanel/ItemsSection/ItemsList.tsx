import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import SingleItem from "components/Home/BottomPanel/ItemsSection/SingleItem";

const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  user-select: none;

  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.grey};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.blue};
  }
`;

const Container = styled.div`
  min-width: 1270px;
  max-width: calc(100% - 8px);
  padding-bottom: 10px;

  @media only screen and (max-width: 589px) {
    min-width: 980px;
  }
`;

const ItemsList = () => {
  const items = [
    {
      images: [{ file_name: "10629234-1308-4958-9aa2-e2fa18e05990.jpeg" }],
      name: "Yeezy",
      price: 200,
      id: "b64d53f0-5c7b-496d-bd6f-a781e54782d0",
      condition: "DS",
    },
    {
      images: [{ file_name: "10629234-1308-4958-9aa2-e2fa18e05990.jpeg" }],
      name: "Yeezy",
      price: 200,
      id: "b64d53f0-5c7b-496d-bd6f-a781e54782d0",
      condition: "DS",
    },
    {
      images: [{ file_name: "10629234-1308-4958-9aa2-e2fa18e05990.jpeg" }],
      name: "Yeezy",
      price: 200,
      id: "b64d53f0-5c7b-496d-bd6f-a781e54782d0",
      condition: "DS",
    },
    {
      images: [{ file_name: "10629234-1308-4958-9aa2-e2fa18e05990.jpeg" }],
      name: "Yeezy",
      price: 200,
      id: "b64d53f0-5c7b-496d-bd6f-a781e54782d0",
      condition: "DS",
    },
    {
      images: [{ file_name: "10629234-1308-4958-9aa2-e2fa18e05990.jpeg" }],
      name: "Yeezy",
      price: 200,
      id: "b64d53f0-5c7b-496d-bd6f-a781e54782d0",
      condition: "DS",
    },
    {
      images: [{ file_name: "10629234-1308-4958-9aa2-e2fa18e05990.jpeg" }],
      name: "Yeezy",
      price: 200,
      id: "b64d53f0-5c7b-496d-bd6f-a781e54782d0",
      condition: "DS",
    },
  ];
  return (
    <Wrapper>
      <Container>
        <Grid container spacing={2}>
          {items.map((item) => (
            <SingleItem
              key={item.id}
              photo={item.images}
              name={item.name}
              price={item.price}
              state={item.condition}
              id={item.id}
            />
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default ItemsList;
