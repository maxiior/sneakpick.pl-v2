import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import defaultUserPicture from "assets/svg/default_user_picture.svg";
import Rating from "./Rating";

const Wrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 157px 5px 20px;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.lightGrey};
  }

  :last-child {
    border: 0;
  }
`;

const Name = styled.div`
  font-weight: 500;
`;

const Number = styled.div`
  font-weight: 500;
  font-size: 18px;
  margin-right: 20px;
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
`;

const Paragraph = styled.div<{ right?: boolean }>`
  font-size: 12px;
  color: ${({ theme }) => theme.darkGrey};
  text-align: ${({ right }) => right && "center"};
`;

const NameHolder = styled.div`
  margin-left: 20px;
`;

const Seller = ({ number }: { number: number }) => {
  return (
    <Wrapper>
      <LeftHolder>
        <Number>{number}</Number>
        <Avatar rating={4.77} photo={defaultUserPicture} />
        <NameHolder>
          <Name>Maksim Brzezinski</Name>
          <Paragraph>23 przedmioty</Paragraph>
        </NameHolder>
      </LeftHolder>
      <RightHolder>
        <Value>32</Value>
        <Value>
          <div>
            <Rating rating={1} />
            <Paragraph right>4.77</Paragraph>
          </div>
        </Value>
      </RightHolder>
    </Wrapper>
  );
};

export default Seller;
