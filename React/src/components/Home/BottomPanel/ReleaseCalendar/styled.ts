import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
`;

export const TopPanel = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
`;

export const Header = styled.div`
  color: ${({ theme }) => theme.black};
  font-weight: 500;
  font-size: 20px;
`;

export const ShowAll = styled(Link)`
  font-size: ${({ theme }) => theme.font_size_MD};
  color: ${({ theme }) => theme.blue};
  text-decoration: none;
  margin-left: 10px;
`;
