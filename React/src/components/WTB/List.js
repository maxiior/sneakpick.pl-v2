import React, { useState } from "react";
import Elements from "components/WTB/atoms/Elements";
import Paragraph from "components/WTB/atoms/Paragraph";
import styled from "styled-components";

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

const Element = styled.div`
  margin: 5px 0;
  display: block;

  label {
    display: inline-block;
    padding-left: 20px;
    position: relative;
    cursor: pointer;
  }

  label > div {
    font-size: 14px;
    margin-top: -4px;
  }
`;

const Other = styled.div`
  font-weight: 600;
  color: #00b4ff;
`;

const List = ({ name, elements }) => {
  const [showList, setShowList] = useState(false);
  const [n, setn] = useState(6);
  const [showMore, setShowMore] = useState("Pokaż więcej");

  const show = () => {
    if (!showList) {
      setShowList(true);
      setn(elements.length);
      setShowMore("Pokaż mniej");
    } else {
      setShowList(false);
      setn(6);
      setShowMore("Pokaż więcej");
    }
  };

  return (
    <Elements>
      <Paragraph>{name}</Paragraph>
      <ElementsList>
        {elements.slice(0, n).map((e, i) => (
          <Element key={i}>
            <label>
              <div>{e.text}</div>
            </label>
          </Element>
        ))}
        {showList && (
          <Element>
            <label>
              <Other>Inne</Other>
            </label>
          </Element>
        )}
      </ElementsList>
      <ShowMore onClick={show}>{showMore}</ShowMore>
    </Elements>
  );
};

export default List;
