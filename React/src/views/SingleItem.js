import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "axios/axios";
import styled, { css } from "styled-components";

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
`;

const Image = styled.div`
  height: 390px;
  background-color: ${({ theme }) => theme.grey};
  width: 45%;
`;

const TopPanel = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const TopLeft = styled.div`
  display: flex;
`;

const TopRight = styled.div`
  display: flex;
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
`;

const Panel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Informations = styled.div`
  margin-bottom: 10px;
`;

const Information = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RightPanel = styled.div`
  box-sizing: border-box;
  width: 360px;
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
`;

const Paragraph = styled.div`
  font-size: 20px;
  margin-bottom: 10px;

  ${({ description }) =>
    description &&
    css`
      margin-top: 20px;
    `}

  ${({ price }) =>
    price &&
    css`
      margin-top: 20px;
      font-weight: 500;
      color: ${({ theme }) => theme.blue};
      font-size: 30px;
    `}
`;

const SingleItem = () => {
  const { slug } = useParams();
  const [data, setData] = useState({ product: [] });

  useEffect(() => {
    axiosInstance.get(slug).then((res) => {
      setData({ product: res.data });
    });
  }, []);

  return (
    <Wrapper>
      <Container>
        <TopPanel>
          <TopLeft>
            <Header>{data.product.name}</Header>
            <Condition>{data.product.condition}</Condition>
          </TopLeft>
          <TopRight>
            <Bump>Follow</Bump>
            <Bump>Bump</Bump>
          </TopRight>
        </TopPanel>
        <Panel>
          <Image />
          <RightPanel>
            <Informations>
              <Paragraph>Szczegóły</Paragraph>
              <Information>
                <Type>Rozmiar</Type>
                <Value> {data.product.shoes_size}</Value>
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
                <Value> {data.product.cw}</Value>
              </Information>
              <Paragraph description>Opis</Paragraph>
              <Value description>{data.product.description}</Value>
              <Paragraph price>{data.product.price} PLN</Paragraph>
            </Informations>
            <Button>Kup teraz</Button>
            <Button>DM</Button>
          </RightPanel>
        </Panel>
      </Container>
    </Wrapper>
  );
};

export default SingleItem;
