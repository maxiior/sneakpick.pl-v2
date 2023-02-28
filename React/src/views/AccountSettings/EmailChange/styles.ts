import styled from "styled-components";

export const Form = styled.form`
  max-width: 450px;
`;

export const Header = styled.div`
  font-size: 25px;
  font-weight: 500;
`;

export const Information = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.darkGrey};
  padding-bottom: 10px;
  margin-bottom: 50px;
  text-align: justify;
  text-justify: inter-word;
`;

export const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.font_size_MD};
  margin: 20px 0 5px 0;
  color: ${({ theme }) => theme.darkGrey};
`;

export const StyledInput = styled.input<{ error: boolean }>`
  outline: none;
  width: 100%;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid
    ${({ theme, error }) => (error ? theme.red : theme.grey)};
  padding: 5px;
  color: ${({ theme }) => theme.darkGrey};
  :focus {
    color: ${({ theme }) => theme.blue};
    border-bottom: 1px solid ${({ theme }) => theme.blue};
  }
`;

export const Button = styled.button`
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.white};
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 50px;
  border: 0;
  :hover {
    opacity: 0.9;
  }
`;

export const Error = styled.div`
  background-color: ${({ theme }) => theme.red};
  padding: 5px;
  color: white;
  font-size: 12px;
  margin-top: 5px;
`;

export const Holder = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
