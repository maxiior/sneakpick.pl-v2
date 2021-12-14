import styled from "styled-components";
import useAuthenticated from "hooks/useAuthenticated";

const Header = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const DataHolder = styled.div``;

const Form = styled.form``;

const Paragraph = styled.p`
  font-size: 14px;
  margin: 20px 0 5px 0;
  color: ${({ theme }) => theme.darkGrey};
`;

const StyledInput = styled.input`
  outline: none;
  width: 300px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  padding: 5px;
  color: ${({ theme }) => theme.darkGrey};
  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.blue};
  }
`;

const Button = styled.button`
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.white};
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 50px;
  border: 0;
  :hover {
    opacity: 0.9;
  }
`;

const PasswordChange = () => {
  useAuthenticated();

  return (
    <Form>
      <Header>Zmień hasło</Header>
      <DataHolder>
        <Paragraph>Obecne hasło</Paragraph>
        <StyledInput autoComplete="off" maxLength={100} type="password" />
        <Paragraph>Nowe hasło</Paragraph>
        <StyledInput autoComplete="off" maxLength={100} type="password" />
        <Paragraph>Powtórz hasło</Paragraph>
        <StyledInput autoComplete="off" maxLength={100} type="password" />
        <Button type="submit">Zmień hasło</Button>
      </DataHolder>
    </Form>
  );
};

export default PasswordChange;
