import styled from "styled-components";
import { Link } from "react-router-dom";
import { iDataBlock } from "types/AccountSettings/datablock";

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  height: 40px;
  grid-gap: 20px;
`;

const Key = styled.div`
  font-size: 14px;
  white-space: nowrap;
  width: 120px;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    white-space: normal;
    width: 60px;
  }
`;

const Value = styled.div`
  color: ${({ theme }) => theme.blue};
  font-size: 14px;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    width: 120px;
  }
`;

const Button = styled(Link)<{ deleteAccount: boolean }>`
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme, deleteAccount }) =>
    deleteAccount ? theme.red : theme.blue};
  border: 1px solid
    ${({ theme, deleteAccount }) => (deleteAccount ? theme.red : theme.blue)};
  font-size: 14px;
  user-select: none;
  cursor: pointer;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  border-radius: ${({ theme }) => theme._10px};
  text-decoration: none;
  width: 100px;
  justify-self: end;

  :hover {
    opacity: 0.9;
  }
`;

const DataBlock = ({
  header,
  value,
  className,
  deleteAccount,
  to,
}: iDataBlock) => {
  return (
    <Wrapper className={className}>
      <Key>{header}</Key>
      <Value>{value}</Value>
      <Button to={to} deleteAccount={deleteAccount}>
        {deleteAccount ? "Usuń" : "Zmień"}
      </Button>
    </Wrapper>
  );
};

export default DataBlock;
