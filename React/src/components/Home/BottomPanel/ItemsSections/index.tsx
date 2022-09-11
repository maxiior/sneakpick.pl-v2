import React, { useEffect, useState } from "react";
import Section from "components/Home/BottomPanel/ItemsSections/Section";
import { routes } from "routes";
import { fetchItems } from "api/services/items.service";

const ItemsSections: React.FC = () => {
  const [newest, setNewest] = useState([]);
  const [popular, setPopular] = useState([]);

  const [pendingNewset, setPendingNewset] = useState(true);
  const [pendingPopular, setPendingPopular] = useState(true);

  useEffect(() => {
    fetchItems(routes.NEWEST)
      .then((response) => {
        if (response.status === 200) {
          setNewest(response.data.results);
          setPendingNewset(false);
        }
      })
      .catch(() => {});
    fetchItems(routes.POPULAR)
      .then((response) => {
        if (response.status === 200) {
          setPopular(response.data.results);
          setPendingPopular(false);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Section
        header="Popularne"
        items={popular}
        to={routes.WTB + routes.POPULAR}
        pending={pendingNewset}
      />
      <Section
        header="Najnowsze"
        items={newest}
        to={routes.WTB + routes.NEWEST}
        pending={pendingPopular}
      />
    </>
  );
};

export default ItemsSections;
