import React from "react";
import TopPanel from "components/Home/TopPanel";
import BottomPanel from "components/Home/BottomPanel";

const Home: React.FC = () => {
  return (
    <div>
      <TopPanel />
      <BottomPanel />
    </div>
  );
};

export default Home;
