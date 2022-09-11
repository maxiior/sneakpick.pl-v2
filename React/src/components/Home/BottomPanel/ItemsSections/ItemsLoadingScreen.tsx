import DummyItem from "components/Home/BottomPanel/ItemsSections/DummyItem";

const ItemsLoadingScreen = () => {
  const rows = [];
  for (let i = 0; i < 6; i++) rows.push(<DummyItem key={i} />);

  return <>{rows}</>;
};

export default ItemsLoadingScreen;
