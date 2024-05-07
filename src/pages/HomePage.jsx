import React from "react";
import Banner from "../module/home/Banner/Banner";
import ProductList from "../module/product/ProductList";

const HomePage = () => {
  return (
    <>
      <div className="px-10">
        <Banner></Banner>
      </div>
      <ProductList></ProductList>
    </>
  );
};

export default HomePage;
