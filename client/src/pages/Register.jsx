import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import schema from "../utils/validationSchema";
import Api from "../utils/frontendApi";

function Register() {
  const [isLoading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Form Data Before Sending:", data);

    setLoading(true);

    // Convert form data to FormData for file upload
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("bio", data.bio);
    formData.append("password", data.password);
    if (data.image) {
      formData.append("image", data.image);
    }

    Api.registerUser(formData) // Ensure API supports FormData
      .then((response) => {
        if (response.success) {
          toast.success("Registration successful!");
          reset();
          setImagePreview(null);
          setValue("image", null);
          navigate("/login");
        } else {
          toast.error("Registration failed");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg ">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Image Upload Section */}
          <div className="mb-4 flex flex-col items-center relative">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full"
              />
            )}
            <input
              type="file"
              accept="image/*"
              id="image"
              className="hidden"
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={() => document.getElementById("image").click()}
              className="mt-2 px-4 py-1  rounded-md"
            >
              Upload Image
            </button>
            <p className="text-red-500 text-sm">{errors.image?.message}</p>
          </div>

          {/* Other Input Fields */}
          {[
            {
              label: "Username",
              name: "username",
              type: "text",
              placeholder: "Enter your username",
            },
            {
              label: "Email",
              name: "email",
              type: "email",
              placeholder: "Enter your email",
            },
            {
              label: "Bio",
              name: "bio",
              type: "text",
              placeholder: "Enter your bio",
            },
            {
              label: "Password",
              name: "password",
              type: "password",
              placeholder: "Enter your password",
            },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name} className="mb-4">
              <label htmlFor={name} className="block font-medium">
                {label}
              </label>
              <input
                type={type}
                id={name}
                {...register(name)}
                className="w-full p-2 border rounded-md"
                placeholder={placeholder}
              />
              <p className="text-red-500 text-sm">{errors[name]?.message}</p>
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-outline w-full"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-lg"></span>
                Processing...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
