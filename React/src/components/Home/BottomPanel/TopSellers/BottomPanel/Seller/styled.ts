import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled(Link)`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 157px 5px 20px;
  cursor: pointer;
  text-decoration: none;

  :hover {
    background-color: ${({ theme }) => theme.lightGrey};
  }

  :last-child {
    border: 0;
  }
`;

export const Name = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.black};
`;

export const Number = styled.div`
  font-weight: 500;
  font-size: 18px;
  margin-right: 20px;
  color: ${({ theme }) => theme.black};
`;

export const LeftHolder = styled.div`
  display: flex;
  align-items: center;
`;

export const RightHolder = styled.div`
  width: 260px;
  display: flex;
  justify-content: space-between;
`;

export const Value = styled.div`
  width: 95px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.black};
`;

export const Paragraph = styled.div<{ right?: boolean }>`
  font-size: ${({ theme }) => theme.font_size_SM};
  color: ${({ theme }) => theme.darkGrey};
  text-align: ${({ right }) => (right ? "right" : "center")};
  width: ${({ right }) => !right && "100%"};
  position: absolute;
`;

export const NameHolder = styled.div`
  margin-left: 20px;
`;

export const ValueHolder = styled.div`
  position: relative;
`;
