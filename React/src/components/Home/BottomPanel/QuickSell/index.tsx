import React, { useEffect, useState } from "react";
import ItemsList from "../ItemsSections/Section/ItemsList";
import { routes } from "routes";
import { fetchItems } from "api/services/items.service";
import { Wrapper, Holder, Timer } from "./styled";

const QuickSell: React.FC = () => {
  const [items, setItems] = useState([]);
  const [pending, setPending] = useState(true);
  const [date, _] = useState("2022-11-14T19:19:06.202317Z");
  const [time, setTime] = useState("15:00");

  const count = () => {
    var drawTime = Math.floor(new Date(date.slice(0, 19)).getTime() / 1000);
    var currentTime = new Date().getTime() / 1000;
    var timeDifference = currentTime - drawTime;

    var minutes = Math.floor(timeDifference / 60);
    var seconds = timeDifference - minutes * 60;
    var finalTime = minutes.toString() + ":" + Math.round(seconds).toString();

    setTime(finalTime);
  };

  useEffect(() => {
    window.setInterval(count, 1000);
  }, [count]);

  useEffect(() => {
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
        <div>Quicksell</div>
        <Timer>{time}</Timer>
      </Holder>
      <ItemsList items={items} pending={pending} />
    </Wrapper>
  );
};

export default QuickSell;
