import React, { useState } from "react";
import Elements from "components/WTB/Elements";
import Paragraph from "components/WTB/Paragraph";
import styled, { css } from "styled-components";
import Element from "./Element";

const ElementsList = styled.div`
  display: block;
`;

const ShowMore = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  font-size: 12px;
  margin-left: 20px;
  margin-top: 15px;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.blue};
  }

  ${({ mobile }) =>
    mobile &&
    css`
      display: flex;
      justify-content: center;
    `}
`;

const List = ({ name, elements, filterType, radio, mobile, currentFilter }) => {
  const [showList, setShowList] = useState(false);
  const [amount, setAmount] = useState(6);
  const [showMore, setShowMore] = useState("Pokaż więcej");

  const show = () => {
    if (!showList) {
      setShowList(true);
      setAmount(elements.length);
      setShowMore("Pokaż mniej");
    } else {
      setShowList(false);
      setAmount(6);
      setShowMore("Pokaż więcej");
    }
  };

  return (
    <Elements mobile={mobile}>
      <div>
        <Paragraph mobile={mobile}>{name}</Paragraph>
        <ElementsList>
          {elements.slice(0, amount).map((e) => (
            <Element
              key={e.id}
              text={e.text}
              filterType={filterType}
              checked={currentFilter}
              radio={radio}
            />
          ))}
        </ElementsList>
        <ShowMore onClick={() => show()}>{showMore}</ShowMore>
      </div>
    </Elements>
  );
};

export default List;
