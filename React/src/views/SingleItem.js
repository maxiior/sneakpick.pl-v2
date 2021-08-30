import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "axios/axios";
import styled, { css } from "styled-components";
import Path from "components/SingleItem/Path";
import Image from "components/SingleItem/Image";
import SimilarItems from "components/SingleItem/SimilarItems";

const Wrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 80%;
  padding: 30px 0;
`;

const Header = styled.header`
  text-align: left;
  width: 100%;
  color: ${({ theme }) => theme.veryDarkGrey};
  font-size: 2em;
`;

const Condition = styled.div`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  user-select: none;
  margin-left: 15px;
`;

const Bump = styled.div`
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.white};
  padding: 5px 10px;
  font-size: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  margin-right: 10px;

  :hover {
    opacity: 0.9;
  }
`;

// const Image = styled.div`
//   height: 390px;
//   background-color: ${({ theme }) => theme.grey};
//   width: 45%;
// `;

const TopPanel = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
  padding-bottom: 30px;
  border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
`;

const TopLeft = styled.div`
  display: flex;
  align-items: center;
`;

const TopRight = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  font-size: 20px;
  user-select: none;
  cursor: pointer;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  border-radius: 10px;

  :hover {
    opacity: 0.9;
  }
`;

const Panel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Informations = styled.div`
  margin-bottom: 30px;
`;

const Information = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RightPanel = styled.div`
  box-sizing: border-box;
  width: 30%;
  padding-left: 20px;
  border-left: 1px solid ${({ theme }) => theme.lightGrey};
`;

const Type = styled.div``;

const Value = styled.div`
  font-weight: 500;

  ${({ description }) =>
    description &&
    css`
      text-align: justify;
      text-justify: inter-word;
      font-weight: 300;
    `}

  ${({ price }) =>
    price &&
    css`
      color: ${({ theme }) => theme.blue};
      font-size: 30px;
    `}
`;

const Paragraph = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 20px;

  :first-child {
    margin-top: 0;
  }

  ${({ price }) =>
    price &&
    css`
      margin-bottom: 0;
    `}
`;

const NumberOfBumps = styled.div`
  color: ${({ theme }) => theme.blue};
  font-size: 20px;
  user-select: none;
`;

const LeftPanel = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
`;

const SingleItem = () => {
  const { slug } = useParams();
  const [data, setData] = useState({ product: {} });

  const bump = () => {
    axiosInstance
      .post("bump/" + data.product.id, {
        id: data.product.id,
      })
      .then((response) => {
        setData({
          product: {
            ...response.data,
            published: resolution(
              response.data.published.substr(0, 10).split("-").reverse()
            ),
          },
        });
      })
      .catch((error) => {});
  };

  const resolution = (table) => {
    let date = "";
    table.forEach((e) => {
      date += e + ".";
    });
    return date.substr(0, 10);
  };

  useEffect(() => {
    axiosInstance.get(slug).then((response) => {
      setData({
        product: {
          ...response.data,
          published: resolution(
            response.data.published.substr(0, 10).split("-").reverse()
          ),
        },
      });
    });
  }, []);

  return (
    <Wrapper>
      <Container>
        <Path category={data.product.category} brand={data.product.brand} />
        <TopPanel>
          <TopLeft>
            <Header>{data.product.name}</Header>
            <Condition>{data.product.condition}</Condition>
          </TopLeft>
          <TopRight>
            <Bump>Follow</Bump>
            <Bump onClick={() => bump()}>Bump</Bump>
            <NumberOfBumps>+{data.product.total_bumps}</NumberOfBumps>
          </TopRight>
        </TopPanel>
        <Panel>
          <LeftPanel>
            <Image />
          </LeftPanel>
          <RightPanel>
            <Informations>
              <Paragraph>Szczegóły</Paragraph>
              <Information>
                <Type>Rozmiar</Type>
                <Value> {data.product.size}</Value>
              </Information>
              <Information>
                <Type>Fit</Type>
                <Value> {data.product.fit}</Value>
              </Information>
              <Information>
                <Type>Rodzaj</Type>
                <Value> {data.product.kind}</Value>
              </Information>
              <Information>
                <Type>Colorway</Type>
                <Value> {data.product.colorway}</Value>
              </Information>
              <Paragraph>Opis</Paragraph>
              <Value description>{data.product.description}</Value>
              <Paragraph price>Cena</Paragraph>
              <Value price>{data.product.price} PLN</Value>
              <Information>
                <Type>Sprzedający</Type>
                <Value>Jan Kowalski</Value>
              </Information>
              <Information>
                <Type>Dodane</Type>
                <Value>{data.product.published}</Value>
              </Information>
            </Informations>
            <Button>Kup teraz</Button>
            <Button>DM</Button>
            <Button>Callout</Button>
          </RightPanel>
        </Panel>
        <SimilarItems />
      </Container>
    </Wrapper>
  );
};

export default SingleItem;
