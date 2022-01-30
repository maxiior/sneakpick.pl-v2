import React, { useEffect, useState } from "react";
import Section from "components/Home/BottomPanel/ItemsSections/Section";
import { routes } from "routes";
import { fetchItems } from "api/services/items.service";

const ItemsSections: React.FC = () => {
  const [newest, setNewest] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const get = async () => {
      setNewest((await fetchItems(routes.NEWEST)).data.results);
      setPopular((await fetchItems(routes.POPULAR)).data.results);
    };
    get();
  }, []);

  return (
    <>
      <Section
        header="Popularne"
        items={popular}
        to={routes.WTB + routes.POPULAR}
      />
      <Section
        header="Najnowsze"
        items={newest}
        to={routes.WTB + routes.NEWEST}
      />
    </>
  );
};

export default ItemsSections;
