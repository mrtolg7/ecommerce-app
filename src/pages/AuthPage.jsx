import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }

      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-xl font-semibold hover:opacity-90 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-indigo-600 font-semibold hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
