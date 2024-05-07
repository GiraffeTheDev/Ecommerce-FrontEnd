import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import NextIcon from "../../../components/icon/NextIcon";
import PreIcon from "../../../components/icon/PreIcon";
import Search from "../../../components/input/Search";
import { getAllProducts, searchProduct } from "../../../services/product";
const itemsPerPage = 5;
const ProductTable = () => {
  const headerTitle = [
    "Title",
    "Price",
    "Stock",
    "Rating",
    "Thumnail",
    "Action",
  ];
  const [products, setProducts] = useState([]);

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const [filter, setFilter] = useState("");
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };
  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    const fetch = async () => {
      if (filter) {
        const response = await searchProduct(filter);
        console.log(response);
        setProducts(response.data.data);
      } else {
        const response = await getAllProducts();
        setProducts(response.data.products);
      }
    };
    fetch();
  }, [filter]);
  return (
    <>
      <div className="flex mb-10 gap-x-10">
        {/* <div className="flex-1">
          <input
            type="text"
            placeholder="Search your movie"
            className="w-full px-5 py-3 text-white rounded-lg outline-none bg-slate-800"
            onChange={handleChange}
          />
        </div> */}
        <Search handleChange={handleChange}></Search>
        <button className="flex items-center justify-center px-5 py-3 text-white rounded-lg bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <div className="mt-5 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white rtl:text-right dark:text-white dark:bg-gray-800">
            Our products
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {headerTitle.map((item) => (
                <th scope="col" className="px-6 py-3" key={item}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              currentItems.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.title}
                  </th>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">{item.stock}</td>
                  <td className="px-6 py-4">{item.rating}</td>
                  <td className="px-6 py-4">
                    {" "}
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="object-cover w-[50px] h-[50px] rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-5">
        <ReactPaginate
          className="flex items-center justify-between w-[500px] navigation"
          breakLabel="..."
          nextLabel=<NextIcon></NextIcon>
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel=<PreIcon></PreIcon>
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default ProductTable;
