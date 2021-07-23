import React, { useState } from "react";
import Elements from "components/WTB/Elements";
import Paragraph from "components/WTB/Paragraph";
import styled from "styled-components";
import Element from "./Element";

const ElementsList = styled.div`
  display: block;
`;

const ShowMore = styled.div`
  color: #777;
  font-size: 12px;
  margin-left: 20px;
  margin-top: 15px;
  cursor: pointer;

  :hover {
    color: #00b4ff;
  }
`;

const List = ({ name, elements, setChecked, onToggle }) => {
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
    <Elements>
      <Paragraph>{name}</Paragraph>
      <ElementsList>
        {elements.slice(0, amount).map((e, i) => (
          <Element
            key={i}
            text={e.text}
            setChecked={setChecked}
            elements={elements}
            checked={e.checked}
            onToggle={onToggle}
          />
        ))}
      </ElementsList>
      <ShowMore onClick={() => show()}>{showMore}</ShowMore>
    </Elements>
  );
};

export default List;
