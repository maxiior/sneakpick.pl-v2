import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  :last-child {
    border: 0;
  }
`;

const Image = styled.div`
  height: 72px;
  min-width: 95px;
  background-color: blue;
  cursor: pointer;
`;

const Holder = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  justify-content: space-between;
`;

const Informations = styled.div`
  padding-right: 15px;
`;

const Price = styled.div`
  color: ${({ theme }) => theme.blue};
  text-align: right;
`;

const Options = styled.div`
  padding-top: 5px;
`;

const Option = styled.div`
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.veryDarkGrey};
  width: 100px;

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Name = styled.div``;

const Parameter = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  font-size: 12px;
`;

const Container = styled.div`
  padding-left: 15px;
  width: 100%;
`;

const FollowedItem = ({ name, size, condition, price }) => {
  const maxLength = (name) => {
    if (name.length > 30) return name.slice(0, 30) + "...";
    return name;
  };
  return (
    <Wrapper>
      <Image />
      <Container>
        <Holder>
          <Informations>
            <Name>{maxLength(name)}</Name>
            <Parameter>Rozmiar: {size}</Parameter>
            <Parameter>Stan: {condition}</Parameter>
          </Informations>
          <Price>{price}PLN</Price>
        </Holder>
        <Options>
          <Option>Usuń z obserwowanych</Option>
        </Options>
      </Container>
    </Wrapper>
  );
};

export default FollowedItem;
