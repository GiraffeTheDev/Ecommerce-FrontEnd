import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/product";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await getAllProducts();
      setProducts(response.data.products);
    };
    fetch();
  }, []);
  return (
    <div>
      <div className="relative flex flex-col justify-center min-h-screen py-6 overflow-hidden bg-gray- sm:py-12">
        <div className="w-full max-w-screen-xl mx-auto">
          <h2 className="mb-4 text-xl font-bold text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic,
            consequuntur.
          </h2>
          <div className="grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {products.length > 0 &&
              products.map((item) => (
                <ProductItem
                  url={item.thumbnail}
                  key={item.id}
                  name={item.title}
                  desc={item.description}
                  discountPercentage={item.discountPercentage}
                  price={item.price}
                  rating={item.rating}
                  to={`/product-detail?id=${item._id}`}
                ></ProductItem>
              ))}
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default ProductList;
