import { StarIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({
  name = "",
  url = "",
  desc = "",
  to = "",
  price,
  discountPercentage,
  rating,
}) => {
  return (
    <Link to={to}>
      <div className="relative p-2 border-2 border-gray-200 border-solid group">
        <div className="w-full overflow-hidden bg-gray-200 rounded-md min-h-60 aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-60">
          <img
            src={url}
            alt={name}
            className="object-cover object-center w-full h-full lg:h-full lg:w-full"
          />
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <h3 className="text-sm text-gray-700">
              <div href={url}>
                <span aria-hidden="true" className="absolute inset-0" />
                {name}
              </div>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              <StarIcon className="inline w-6 h-6"></StarIcon>
              <span className="align-bottom ">{rating}</span>
            </p>
          </div>
          <div>
            <p className="block text-sm font-medium text-gray-900">
              {price * (discountPercentage / 100)}
            </p>
            <p className="block text-sm font-medium text-gray-400 line-through">
              {price}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
