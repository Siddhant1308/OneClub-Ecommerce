import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } },
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async (data) => {
    const endpoint = isLogin
      ? "http://localhost:9000/auth/login"
      : "http://localhost:9000/auth/register";

    if (!isLogin) {
      const email = data.email || "";
      const isAdmin = email.trim().toLowerCase().endsWith("@oneclub.com");
      data.role = isAdmin ? "ADMIN" : "USER";
    }

    setLoading(true);

    try {
      const response = await axios.post(endpoint, data);
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        toast.success("Login Successful!");
        setIsLoggedIn(true);
        navigate("/");
      } else {
        toast.error("Token not received");
      }

      reset();
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      console.error("❌ Error:", errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      {/* Logo */}
      <img src="oneclub.jpg" alt="OneClub" className="w-[200px]" />

      {/* Form or Loader */}
      <div className="w-full flex justify-center items-start min-h-[300px]">
        <AnimatePresence mode="wait" initial={false}>
          {loading ? (
            <motion.div
              key="loading"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-xl w-[90%] sm:max-w-96 min-h-[300px]"
            >
              <div className="w-12 h-12 border-4 border-t-black border-gray-300 rounded-full animate-spin"></div>
              <p className="text-black text-lg font-semibold mt-4">Logging in...</p>
            </motion.div>
          ) : (
            <motion.form
              key={isLogin ? "Login" : "Register"}
              onSubmit={handleSubmit(onSubmitHandler)}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-[90%] sm:max-w-96 flex flex-col items-center gap-4 text-gray-800 bg-white p-6 rounded-xl shadow-xl"
            >
              {/* Header */}
              <div className="inline-flex items-center gap-2 mb-2">
                <p className="text-3xl font-semibold">{isLogin ? "Login" : "Register"}</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
              </div>

              {/* Name field only for register */}
              {!isLogin && (
                <>
                  <input
                    type="text"
                    placeholder="Name"
                    {...register("name", {
                      required: "Name is required",
                      pattern: {
                        value: /^[A-Za-z ]+$/,
                        message: "Name must not contain special characters",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-800 rounded"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm -mt-2">{errors.name.message}</p>
                  )}
                </>
              )}

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-800 rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm -mt-2">{errors.email.message}</p>
              )}

              {/* Password */}
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()[\]{}|\\/:;<>,.~`_+=-]).{5,}$/,
                      message:
                        "Password must include upper, lower, number, special char, and 5+ chars",
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-800 rounded pr-10"
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer select-none"
                  onClick={() => setShowPassword(!showPassword)}
                  title="Toggle Password"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm -mt-2">{errors.password.message}</p>
              )}

              {/* Toggle */}
              <div className="w-full flex justify-between text-sm -mt-1">
                <p>{isLogin ? "Forgot your password?" : "Already have an account?"}</p>
                <p
                  onClick={() => setIsLogin((prev) => !prev)}
                  className="cursor-pointer underline"
                >
                  {isLogin ? "Create Account" : "Login Here"}
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer rounded hover:bg-gray-800 transition"
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;