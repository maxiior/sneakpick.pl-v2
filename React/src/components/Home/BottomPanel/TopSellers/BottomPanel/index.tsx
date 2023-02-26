import React from "react";
import TopPanel from "./TopPanel";
import Seller from "./Seller";

const BottomPanel: React.FC = () => {
  return (
    <div>
      <TopPanel />
      <Seller number={1} />
      <Seller number={2} />
      <Seller number={3} />
      <Seller number={4} />
      <Seller number={5} />
    </div>
  );
};

export default BottomPanel;
