import { useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Input from "../components/input/Input";
import Radio from "../components/radio/Radio";
import { handleRemoveCart } from "../store/cart/handler";

function CheckOut() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const { items } = useSelector((state) => state.cart);
  const totalAmount = items.reduce(
    (amount, item) => item.productId.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleQuantity = (e, item) => {};

  const handleRemove = (e, id) => {
    dispatch(handleRemoveCart(id));
  };
  const handleOrder = (values) => {
    console.log(values);
  };
  const watchType = watch("ordertype");
  return (
    <>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {/* This form is for address */}
            <form
              className="px-5 py-12 mt-12 bg-white"
              onSubmit={handleSubmit(handleOrder)}
              autoComplete="off"
            >
              <div className="space-y-12">
                <div className="pb-12 border-b border-gray-900/10">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <Input control={control} name="name"></Input>
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <Input control={control} name="email"></Input>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <Input control={control} name="phone"></Input>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <Input control={control} name="street"></Input>
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <Input control={control} name="city"></Input>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <Input control={control} name="province"></Input>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <Input control={control} name="zip"></Input>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end mt-6 gap-x-6">
                  <button
                    onClick={() => reset()}
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
            <div className="pb-12 border-b border-gray-900/10">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Addresses
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Choose from Existing addresses
              </p>
              {/* <ul>
                {user.addresses.map((address, index) => (
                  <li
                    key={index}
                    className="flex justify-between px-5 py-5 border-2 border-gray-200 border-solid gap-x-6"
                  >
                    <div className="flex gap-x-4">
                      <input
                        onChange={handleAddress}
                        name="address"
                        type="radio"
                        value={index}
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                      />
                      <div className="flex-auto min-w-0">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                          {address.street}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                          {address.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone: {address.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {address.city}
                      </p>
                    </div>
                  </li>
                ))}
              </ul> */}

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose One
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <Radio
                        control={control}
                        name={"ordertype"}
                        checked={watchType === "cash"}
                        value={"cash"}
                      >
                        Cash
                      </Radio>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <Radio
                        control={control}
                        name={"ordertype"}
                        checked={watchType === "card"}
                        value={"card"}
                      >
                        Card Payment
                      </Radio>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="px-2 mx-auto mt-12 bg-white max-w-7xl sm:px-2 lg:px-4">
              <div className="px-0 py-6 border-t border-gray-200 sm:px-0">
                <h1 className="my-5 text-4xl font-bold tracking-tight text-gray-900">
                  Cart
                </h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                          <img
                            src={item.productId.thumbnail}
                            alt={item.productId.title}
                            className="object-cover object-center w-full h-full"
                          />
                        </div>

                        <div className="flex flex-col flex-1 ml-4">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.productId.id}>
                                  {item.productId.title}
                                </a>
                              </h3>
                              <p className="ml-4">${item.productId.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.productId.brand}
                            </p>
                          </div>
                          <div className="flex items-end justify-between flex-1 text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty
                              </label>
                              <select
                                onChange={(e) => handleQuantity(e, item)}
                                value={item.quantity}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                onClick={(e) => handleRemove(e, item.id)}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-2 py-6 border-t border-gray-200 sm:px-2">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$ {totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{totalItems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkOut.
                </p>
                <div className="mt-6">
                  <div
                    onClick={() => {
                      console.log("order");
                    }}
                    className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-indigo-700"
                  >
                    Order Now
                  </div>
                </div>
                <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                  <p>
                    or
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
