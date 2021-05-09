import Elements from "components/WTB/Elements";
import Paragraph from "components/WTB/Paragraph";
import styled from "styled-components";

const GridElements = styled.div`
  display: grid;
  margin-top: 5px;
  grid-gap: 5px;
`;

const GridElement = styled.div`
  span {
    display: flex;
    border: 1px solid #ddd;
    height: 30px;
    font-size: 14px;
    cursor: pointer;
    color: #ddd;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    overflow: hidden;
  }

  label {
    cursor: pointer;
  }

  label input[type="checkbox"] {
    display: none;
  }

  label input[type="checkbox"]:checked ~ span {
    border-color: #191919;
    color: white;
    background-color: #191919;
  }
`;

const GridList = ({ name, elements, width, grid }) => {
  return (
    <Elements>
      <Paragraph>{name}</Paragraph>
      <GridElements style={{ gridTemplateColumns: grid }}>
        {elements.map((e, i) => (
          <GridElement key={i}>
            <label>
              <input type="checkbox" />
              <span style={{ width: width }}>{e.text}</span>
            </label>
          </GridElement>
        ))}
      </GridElements>
    </Elements>
  );
};

export default GridList;
