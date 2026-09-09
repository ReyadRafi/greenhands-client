import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { loginUser, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMsg, setErrorMsg] = useState("");

  // Where the user was trying to go before being redirected to /login
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success("Logged in successfully!");
        navigate(from, { replace: true });
      })
      .catch(() => {
        const msg = "Invalid email or password";
        setErrorMsg(msg);
        toast.error(msg);
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("Google login failed. Please try again.");
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-green-700 mb-1 text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to continue to GreenHands
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-700 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;