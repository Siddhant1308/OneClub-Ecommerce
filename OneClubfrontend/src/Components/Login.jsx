import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 👇 ROLE STATE (ADDED)
  const [role, setRole] = useState("USER");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // 🔐 LOGIN
        const res = await api.post("/auth/login", { email, password });
        const token = res.data.token;

        if (!token) throw new Error("Token not received");

        login(token);
        navigate("/");
      } else {
        // 🆕 SIGNUP
        await api.post("/auth/register", {
          name,
          email,
          password,
          role, // 👈 ROLE SENT
        });

        alert("Account created successfully ✅ Please login");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm border border-gray-300 p-8 rounded">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isLogin ? "Sign in" : "Create account"}
        </h1>

        <p className="text-sm mt-2">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:underline"
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-600 hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border"
              required
            />
          )}

          {/* 👇 ROLE DROPDOWN (ADDED) */}
          {!isLogin && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border"
              required
            >
              <option value="ROLE_USER">User</option>
              <option value="ROLE_VENDOR">Vendor</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border"
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Sign in"
              : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;