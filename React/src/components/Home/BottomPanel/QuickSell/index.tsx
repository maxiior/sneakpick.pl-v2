import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ItemsList from "../ItemsSections/ItemsList";
import { routes } from "routes";
import { fetchItems } from "api/services/items.service";

const Wrapper = styled.div`
  width: 100%;
`;

const Holder = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.veryDarkGrey};
  padding: 10px;
  display: flex;
  align-items: center;
`;

const Timer = styled.div`
  margin-left: 15px;
  font-size: 14px;
`;

const Header = styled.div``;

const QuickSell: React.FC = () => {
  const [items, setItems] = useState([]);
  const [pending, setPending] = useState(true);
  const [date, setDate] = useState("2022-11-14T19:19:06.202317Z");
  const [time, setTime] = useState("15:00");

  function str_pad_left(string: number, pad: string, length: number) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  const count = () => {
    var drawTime = Math.floor(new Date(date.slice(0, 19)).getTime() / 1000);
    var currentTime = new Date().getTime() / 1000;
    var timeDifference = currentTime - drawTime;

    var minutes = Math.floor(timeDifference / 60);
    console.log(minutes);
    var seconds = timeDifference - minutes * 60;
    var finalTime = minutes.toString() + ":" + Math.round(seconds).toString();

    setTime(finalTime);
  };

  useEffect(() => {
    window.setInterval(count, 1000);
    fetchItems(routes.NEWEST)
      .then((response) => {
        if (response.status === 200) {
          setItems(response.data.results);
          setPending(false);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <Wrapper>
      <Holder>
        <Header>Quicksell</Header>
        <Timer>{time}</Timer>
      </Holder>
      <ItemsList items={items} pending={pending} />
    </Wrapper>
  );
};

export default QuickSell;
