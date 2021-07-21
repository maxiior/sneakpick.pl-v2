import React, { useState } from "react";
import Elements from "components/WTB/Elements";
import Paragraph from "components/WTB/Paragraph";
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
  font-size: 14px;
`;

const Checkbox = styled.div`
  margin-right: 5px;
  width: 15px;
  height: 15px;
  border: 1px solid #f0f0f0;
  display: inline-block;
`;

const Type = styled.div`
  margin-top: -4px;
  display: inline-block;
  padding: 5px 0;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const StyledInput = styled.input`
  opacity: 0;
  position: absolute;

  :checked + ${Checkbox} {
    background-color: #00b4ff;
    box-shadow: inset 0 0 0 2px white;
  }
`;

const Other = styled.div`
  color: #00b4ff;
  font-weight: 600;
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
            <StyledLabel>
              <StyledInput type="checkbox" />
              <Checkbox />
              <Type>{e.text}</Type>
            </StyledLabel>
          </Element>
        ))}
        {showList && (
          <Element>
            <StyledLabel>
              <StyledInput type="checkbox" />
              <Checkbox />
              <Other>Inne</Other>
            </StyledLabel>
          </Element>
        )}
      </ElementsList>
      <ShowMore onClick={show}>{showMore}</ShowMore>
    </Elements>
  );
};

export default List;
