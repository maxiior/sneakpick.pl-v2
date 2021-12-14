import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
`;

const Button = styled(Link)`
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme, deleteAccount }: { theme: any; deleteAccount: boolean }) =>
    deleteAccount ? theme.red : theme.blue};
  border: 1px solid
    ${({ theme, deleteAccount }) => (deleteAccount ? theme.red : theme.blue)};
  font-size: 16px;
  user-select: none;
  cursor: pointer;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  border-radius: ${({ theme }) => theme._5px};
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

interface iDataBlock {
  header: string;
  value: string;
  className: string;
  deleteAccount: boolean;
  to: string;
}

const DataBlock = ({
  header,
  value,
  className,
  deleteAccount,
  to,
}: iDataBlock) => {
  return (
    <Wrapper className={className}>
      <Container>
        <Header>{header}</Header>
        <Value>{value}</Value>
      </Container>
      <Button to={to} deleteAccount={deleteAccount}>
        {deleteAccount ? "Usuń" : "Zmień"}
      </Button>
    </Wrapper>
  );
};

export default DataBlock;
