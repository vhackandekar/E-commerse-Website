import React from "react";
import Hero from "./Hero";
import FlashSales from "./FlashSales";
import Categories from "./Categories";
import BestSelling from "./BestSelling";
import ExploreProducts from "./ExploreProducts";
import NewArrival from "./NewArrival";
import Service from "./Service";

const Home = () => {
  return (
    <>
      <Hero />
      <FlashSales />
      <Categories />
      <BestSelling />
      <ExploreProducts />
      <NewArrival />
      <Service />
    </>
  );
};

export default Home;
