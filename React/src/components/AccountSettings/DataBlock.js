import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
`;

const Button = styled.div`
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme, deleteAccount }) =>
    deleteAccount ? theme.red : theme.blue};
  border: 1px solid
    ${({ theme, deleteAccount }) => (deleteAccount ? theme.red : theme.blue)};
  font-size: 16px;
  user-select: none;
  cursor: pointer;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  text-decoration: none;
  min-width: 90px;

  :hover {
    opacity: 0.9;
  }
`;

const Header = styled.div`
  width: 150px;
`;

const Value = styled.div`
  color: ${({ theme }) => theme.blue};
  margin-left: 10px;
`;

const Container = styled.div`
  display: flex;
`;

const DataBlock = ({ header, value, className, deleteAccount }) => {
  return (
    <Wrapper className={className}>
      <Container>
        <Header deleteAccount={deleteAccount}>{header}</Header>
        <Value>{value}</Value>
      </Container>
      <Button deleteAccount={deleteAccount}>
        {deleteAccount ? "Usuń" : "Zmień"}
      </Button>
    </Wrapper>
  );
};

export default DataBlock;
