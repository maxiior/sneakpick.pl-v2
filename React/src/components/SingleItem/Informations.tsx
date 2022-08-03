import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "routes";

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 30%;
  padding-left: 20px;
  border-left: 1px solid ${({ theme }) => theme.lightGrey};
`;

const Container = styled.div`
  @media only screen and (max-width: ${({ theme }) => theme.max_width_XL}) {
    width: 40%;
  }
  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    width: 60%;
  }
  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    width: 90%;
  }
`;

const Holder = styled.div`
  margin-bottom: 30px;
`;

const Paragraph = styled.div<{ $price?: boolean }>`
  font-size: 20px;
  margin-bottom: ${({ $price }) => ($price ? "0" : "10px")};
  margin-top: 20px;
  user-select: none;

  :first-child {
    margin-top: 0;
  }
`;

const Information = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Key = styled.div`
  user-select: none;
`;

const Value = styled.div<{
  $description?: boolean;
  $price?: boolean;
}>`
  font-weight: 500;

  ${({ $description }) =>
    $description &&
    css`
      text-align: justify;
      text-justify: inter-word;
      font-weight: 300;
    `}

  ${({ $price }) =>
    $price &&
    css`
      color: ${({ theme }) => theme.blue};
      font-size: 25px;
      margin-bottom: 20px;
    `}
`;

const Owner = styled(Link)`
  font-weight: 500;
  color: ${({ theme }) => theme.black};
  text-decoration: none;

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Button = styled(Link)`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  user-select: none;
  cursor: pointer;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme._5px};
  text-decoration: none;
  font-size: 14px;

  :hover {
    opacity: 0.9;
  }
`;

const Informations = ({ data }: { data: any }) => {
  return (
    <Wrapper>
      <Container>
        <Holder>
          <Paragraph>Szczegóły</Paragraph>
          <Information>
            <Key>Rozmiar</Key>
            <Value> {data.product.size}</Value>
          </Information>
          <Information>
            <Key>Fit</Key>
            <Value> {data.product.fit}</Value>
          </Information>
          <Information>
            <Key>Rodzaj</Key>
            <Value> {data.product.kind}</Value>
          </Information>
          <Information>
            <Key>Colorway</Key>
            <Value>{data.product.colorway}</Value>
          </Information>
          <Paragraph>Opis</Paragraph>
          <Value $description>{data.product.description}</Value>
          <Paragraph $price>Cena</Paragraph>
          <Value $price>{data.product.price} PLN</Value>
          <Information>
            <Key>Sprzedający</Key>
            <Owner
              to={routes.USER_PROFILE_PRODUCTS.replace(
                ":user",
                data.product.owner
              )}
            >
              {data.product.first_name} {data.product.last_name}
            </Owner>
          </Information>
          <Information>
            <Key>Dodane</Key>
            <Value>{data.product.published}</Value>
          </Information>
        </Holder>
        <Button to={routes.ORDER.replace(":item", data.product.id)}>
          Kup teraz
        </Button>
        <Button to="">DM</Button>
        <Button to={routes.CALLOUT.replace(":item", data.product.id)}>
          Callout
        </Button>
      </Container>
    </Wrapper>
  );
};

export default Informations;
