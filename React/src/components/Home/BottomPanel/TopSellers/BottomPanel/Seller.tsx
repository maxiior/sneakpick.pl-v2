import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import defaultUserPicture from "assets/svg/default_user_picture.svg";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Wrapper = styled(Link)`
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

const Name = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.black};
`;

const Number = styled.div`
  font-weight: 500;
  font-size: 18px;
  margin-right: 20px;
  color: ${({ theme }) => theme.black};
`;

const LeftHolder = styled.div`
  display: flex;
  align-items: center;
`;

const RightHolder = styled.div`
  width: 260px;
  display: flex;
  justify-content: space-between;
`;

const Value = styled.div`
  width: 95px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.black};
`;

const Paragraph = styled.div<{ right?: boolean }>`
  font-size: 12px;
  color: ${({ theme }) => theme.darkGrey};
  text-align: ${({ right }) => (right ? "right" : "center")};
  width: ${({ right }) => !right && "100%"};
  position: absolute;
`;

const NameHolder = styled.div`
  margin-left: 20px;
`;

const ValueHolder = styled.div`
  position: relative;
`;

const Seller = ({ number }: { number: number }) => {
  return (
    <Wrapper to="">
      <LeftHolder>
        <Number>{number}</Number>
        <Avatar rating={4.77} photo={defaultUserPicture} />
        <NameHolder>
          <Name>Maksim Brzezinski</Name>
          <Paragraph right>23 przedmioty</Paragraph>
        </NameHolder>
      </LeftHolder>
      <RightHolder>
        <Value>32</Value>
        <Value>
          <ValueHolder>
            <Rating rating={1} />
            <Paragraph>4.77</Paragraph>
          </ValueHolder>
        </Value>
      </RightHolder>
    </Wrapper>
  );
};

export default Seller;
