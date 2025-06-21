import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import GoogleLogin from "../GoogleLogin/GoogleLogin";

const Login = () => {
  const { register, handleSubmit, formState:{errors} } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="bg-base-200">
      <div className="card bg-base-100 w-full max-w-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-5xl font-bold">Login now!</h1>
            <fieldset className="fieldset">

                {/* Email field */}
              <label className="label">Email</label>
              <input type="email"
              className="input" placeholder="Email"
              {...register("email", {required: true})}
              />
              {
                errors.email?.type === "required" && <p className="text-red-500">email is required</p>
              }

              {/* Password field */}
              <label className="label">Password</label>
              <input 
              type="password" 
              className="input" placeholder="Password" 
              {...register("password", {required: true, minLength: 6})}
              />
              {
                errors.password?.type === "required" && <p className="text-red-500">password is required</p>
              }
              {
                errors.password?.type === "minLength" && <p className="text-red-500">Password must be 6 characters or longer</p>
              }

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-primary text-black mt-4">Login</button>
            </fieldset>
            <p>Don't have an account <Link className="btn btn-link" to="/register">Register</Link></p>
          </form>
          <GoogleLogin></GoogleLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
