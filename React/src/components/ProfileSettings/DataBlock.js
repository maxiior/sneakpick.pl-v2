import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  outline: none;
  width: 300px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid
    ${({ theme, error }) => (error ? theme.red : theme.grey)};
  padding: 5px 12px;
  color: ${({ theme }) => theme.darkGrey};

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.blue};
  }
`;

const Header = styled.div``;

const DataBlock = ({ header, value, className }) => {
  return (
    <Wrapper className={className}>
      <Header>{header}</Header>
      <StyledInput autoComplete="off" maxLength={100} value={value} />
    </Wrapper>
  );
};

export default DataBlock;
