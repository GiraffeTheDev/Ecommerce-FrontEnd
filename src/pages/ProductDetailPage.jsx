import { RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import LoadingSpiner from "../components/loading/LoadingSpiner";
import { getAProduct } from "../services/product";
import { handleAddCart } from "../store/cart/handler";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const colors = [
  {
    name: "White",
    class: "bg-white",
    selectedClass: "ring-gray-400",
  },
  {
    name: "Gray",
    class: "bg-gray-200",
    selectedClass: "ring-gray-400",
  },
  {
    name: "Black",
    class: "bg-gray-900",
    selectedClass: "ring-gray-900",
  },
];
const sizes = [
  {
    name: "XXS",
    inStock: false,
  },
  {
    name: "XS",
    inStock: true,
  },
  {
    name: "S",
    inStock: true,
  },
  {
    name: "M",
    inStock: true,
  },
  {
    name: "L",
    inStock: true,
  },
  {
    name: "XL",
    inStock: true,
  },
  {
    name: "XXL",
    inStock: true,
  },
];
const highlights = [
  "Hand cut and sewn locally",
  "Dyed with our property colors",
  "Pre-washed & pre-shrunk",
  "Ultra-soft 100% cotton",
];
const ProductDetailPage = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [product, setProduct] = useState({});
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const handleCart = (values) => {
    const newValues = {
      userId: user._id,
      productId: id,
      quanlity: 1,
    };
    dispatch(handleAddCart(newValues));
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await getAProduct(id);
      setProduct(response.data.data);
    };
    fetch();
  }, [id]);
  return (
    <>
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center max-w-2xl px-4 mx-auto space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs &&
              product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-4 h-5 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.title}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        {product ? (
          <div className="max-w-2xl mx-auto mt-6 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="hidden overflow-hidden rounded-lg aspect-h-4 aspect-w-3 lg:block">
              <img
                src={product?.images ? product.images[0] : product.thumbnail}
                alt={product.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="overflow-hidden rounded-lg ">
                <img
                  src={product?.images ? product.images[1] : product.thumbnail}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="overflow-hidden rounded-lg ">
                <img
                  src={product?.images ? product.images[2] : product.thumbnail}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className=" sm:overflow-hidden sm:rounded-lg">
              <img
                src={product?.images ? product.images[3] : product.thumbnail}
                alt={product.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ) : (
          <LoadingSpiner></LoadingSpiner>
        )}

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-2xl tracking-tight text-red-600 line-through">
              {product.price}
              {".000$"}
            </p>
            <p className="text-3xl tracking-tight text-gray-900">
              {Math.round(
                product.price * (1 - product.discountPercentage / 100)
              )}
              {".000$"}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="mb-3">Reviews</h3>
              <div className="flex items-center gap-x-3">
                <div className="flex items-center ">
                  {Array(5)
                    .fill(0)
                    .map((rating) => (
                      <StarIcon
                        key={uuidv4()}
                        className={classNames(
                          product.rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                </div>
                <p className="">{product.rating} out of 5 stars</p>
              </div>
            </div>

            <form className="mt-10" onSubmit={handleSubmit(handleCart)}>
              {/* Colors */}
              {colors && colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedClass,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Sizes */}
              {sizes && sizes.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="absolute border-2 border-gray-200 rounded-md pointer-events-none -inset-px"
                                >
                                  <svg
                                    className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              <button
                type="submit"
                className="flex items-center justify-center w-full px-8 py-3 mt-10 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to Cart
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            {highlights && (
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="pl-4 space-y-2 text-sm list-disc">
                    {highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
