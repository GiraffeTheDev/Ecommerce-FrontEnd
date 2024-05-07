import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import Button from "../components/button/Button";
import Heading from "../components/heading/Heading";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { handleRegister } from "../store/auth/handlers";
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Full Name is required!"),
    email: yup.string().required("Email is required!"),
    password: yup.string().required("Password is required!"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .required();
const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const handleSignUp = (values) => {
    dispatch(handleRegister(values));
  };
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Heading title="Create New Account"></Heading>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          noValidate
          className="space-y-2"
          onSubmit={handleSubmit(handleSignUp)}
        >
          <div>
            <Label title="FullName" htmlFor="name"></Label>
            <Input control={control} type="text" name="name"></Input>
            {errors && errors?.name ? (
              <p className="mt-2 text-red-500">{errors.name.message}</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <Label title="Email" htmlFor="email"></Label>
            <Input control={control} type="email" name="email"></Input>
            {errors && errors?.email ? (
              <p className="mt-2 text-red-500">{errors.email.message}</p>
            ) : (
              ""
            )}
          </div>

          <div>
            <Label title="Password" htmlFor="password"></Label>
            <Input control={control} type="password" name="password"></Input>
            {errors && errors?.password ? (
              <p className="mt-2 text-red-500">{errors.password.message}</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <Label title="Confirm Password" htmlFor="confirmpassword"></Label>
            <Input
              control={control}
              type="password"
              name="confirmpassword"
            ></Input>
            {errors && errors?.confirmpassword ? (
              <p className="mt-2 text-red-500">
                {errors.confirmpassword.message}
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            <Button
              type="submit"
              disable={isSubmitting}
              isLoading={isSubmitting}
              className={`mt-3 ${isSubmitting ? "opacity-[0.5]" : ""}`}
            >
              Sign Up
            </Button>
          </div>
        </form>

        <p className="mt-10 text-sm text-center text-gray-500">
          Already a Member?{" "}
          <Link
            to="/sign-in"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Log In
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUpPage;
