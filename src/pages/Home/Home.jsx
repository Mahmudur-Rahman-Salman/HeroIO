import React from "react";
import Banner from "../../components/Banner";
import StatsSection from "../../components/StatsSection";
import TopApps from "../../components/TopApps";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Banner></Banner>
      <StatsSection></StatsSection>
      <TopApps></TopApps>
    </div>
  );
};

export default Home;
