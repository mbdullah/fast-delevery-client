import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";
import GoogleLogin from "../GoogleLogin/GoogleLogin";

const Register = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {createUser} = useAuth();
    const onSubmit = data => {
        createUser(data.email, data.password)
        .then(result => {
          console.log(result.user);
        })
        .catch(error => {
          console.error(error);
        })
    }
  return (
    <div className="bg-base-200">
      <div className="card bg-base-100 w-full max-w-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-5xl font-bold">Create an Account!</h1>
            <fieldset className="fieldset">
              {/* Email field */}
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">emil is required</p>
              )}

              {/* Password field */}
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer
                </p>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-primary text-black mt-4">Register</button>
            </fieldset>
            <p>Already have an account <Link className="btn btn-link" to="/login">Login</Link></p>
          </form>
            <GoogleLogin></GoogleLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
