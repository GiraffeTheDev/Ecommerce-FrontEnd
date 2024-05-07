import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import Heading from "../components/heading/Heading";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { handleLogin } from "../store/auth/handlers";

const SignInPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleSubmitLogin = (values) => {
    dispatch(handleLogin(values));
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Heading title="Log in to your account"></Heading>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          noValidate
          onSubmit={handleSubmit(handleSubmitLogin)}
          className="space-y-6"
        >
          <div>
            <Label htmlFor="email" title="Email address"></Label>
            <Input control={control} type="email" name="email"></Input>
          </div>

          <div>
            <Label htmlFor="password" title="Password"></Label>
            <Input control={control} type="password" name="password"></Input>
            <div className="mt-2 text-sm">
              <Link
                to="/forgot-password"
                className="ml-auto font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disable={isSubmitting}
              isLoading={isSubmitting}
              className={isSubmitting ? "opacity-[0.5]" : ""}
            >
              Log in
            </Button>
          </div>
        </form>

        <p className="mt-10 text-sm text-center text-gray-500">
          Not a member?{" "}
          <Link
            to="/sign-up"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignInPage;
