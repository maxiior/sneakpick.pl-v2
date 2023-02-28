import Paragraph from "components/WTB/Paragraph";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Elements from "components/WTB/Elements";
import { useAppSelector } from "hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { onFilterClick } from "functions/onFilterClick";

const RangeSlider = styled.div<{ mobile: boolean }>`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin: 0 auto 5px;
  min-width: ${({ mobile }) => mobile && "300px"};
`;

const RangeGroup = styled.div`
  position: relative;
  flex: 0 0 100%;
  height: 20px;
`;

const RangeInput = styled.input<{ percent: number }>`
  position: absolute;
  left: 0;
  bottom: 0;
  margin-bottom: 0;
  -webkit-appearance: none;
  width: 100%;
  border-bottom: 0;

  &:focus {
    outline: 0;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    background: ${({ theme, percent }) =>
      "linear-gradient(to right, " +
      theme.blue +
      " 0%, " +
      theme.blue +
      " " +
      percent +
      "%, " +
      theme.darkGrey +
      " " +
      percent +
      "%, " +
      theme.darkGrey +
      " 100%)"};
    border-radius: 1px;
    box-shadow: none;
    border: 0;
  }

  &::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.blue};
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7px;
  }

  &::-moz-range-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    animation: 0.2s;
    background: ${({ theme }) => theme.blue};
    border-radius: 1px;
    box-shadow: none;
    border: 0;
  }

  &::-moz-range-thumb {
    z-index: 2;
    position: relative;
    box-shadow: 0px 0px 0px #000;
    border: 1px solid ${({ theme }) => theme.blue};
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.blue};
    cursor: pointer;
  }

  &::-ms-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    animation: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &::-ms-fill-lower,
  &::-ms-fill-upper {
    background: ${({ theme }) => theme.blue};
    border-radius: 1px;
    box-shadow: none;
    border: 0;
  }

  &::-ms-thumb {
    z-index: 2;
    position: relative;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.blue};
    cursor: pointer;
  }
`;

const Value = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 13px;
  font-size: 12px;
  color: ${({ theme }) => theme.darkGrey};
`;

const InputRange = ({ filterType, currentFilter, mobile = false }: any) => {
  const { max_price } = useAppSelector((state) => state.itemsSlice);
  const [value, setValue] = useState("0");
  const navigate = useNavigate();

  useEffect(() => {
    setValue(currentFilter !== -1 ? currentFilter : max_price.toString());
  }, [max_price, currentFilter]);

  return (
    <Elements mobile={mobile}>
      <div>
        <Paragraph mobile={mobile}>Cena</Paragraph>
        <RangeSlider mobile={mobile}>
          <RangeGroup>
            <RangeInput
              min="0"
              max={max_price.toString()}
              step="1"
              type="range"
              percent={((parseInt(value) - 0) / (max_price - 0)) * 100}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onMouseUp={() => {
                onFilterClick(
                  filterType.name,
                  value,
                  filterType.input,
                  navigate
                );
              }}
            />
          </RangeGroup>
          <Value>do {value} PLN</Value>
        </RangeSlider>
      </div>
    </Elements>
  );
};

export default InputRange;
