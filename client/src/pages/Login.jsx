import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, } from "react-hook-form";
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { login, setLoading} from "../redux/reducers/auth";
import axios from "axios";
import { API_BASE_URL } from "../config";

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(login(res.data));
      navigate("/");
      toast.success("Logged in successfully");
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen m_font">
      <div className="w-full max-w-sm p-8  rounded-lg shadow-2xl border border-sky-800">
        <h2 className="text-2xl font-bold text-center  mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 ">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 border border-sky-800 focus:outline focus:outline-1 focus:outline-sky-700 rounded-md"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 ">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters",
                },
              })}
              className="w-full p-2 border border-sky-800 focus:outline focus:outline-1 focus:outline-sky-700 rounded-md"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn p_font w-full btn-outline border border-sky-800 text-xl"
          >
            {loading ? (
              <span className="loading loading-spinner">Logging in...</span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm ">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
