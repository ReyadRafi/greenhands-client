import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const { registerUser, updateUserProfile, loginWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photoURL = form.photoURL.value.trim();
    const password = form.password.value;

    // Password validation: uppercase, lowercase, min 6 characters
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpperCase) {
      const msg = "Password must contain at least one uppercase letter";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }
    if (!hasLowerCase) {
      const msg = "Password must contain at least one lowercase letter";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }
    if (!isLongEnough) {
      const msg = "Password must be at least 6 characters long";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    registerUser(email, password)
      .then(() => {
        return updateUserProfile(name, photoURL);
      })
      .then(() => {
        toast.success("Account created successfully!");
        navigate("/");
      })
      .catch((error) => {
        const msg =
          error.code === "auth/email-already-in-use"
            ? "This email is already registered"
            : "Registration failed. Please try again.";
        setErrorMsg(msg);
        toast.error(msg);
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Google login failed. Please try again.");
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-green-700 mb-1 text-center">
          Create an Account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join GreenHands and start making an impact
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

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
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              placeholder="https://example.com/your-photo.jpg"
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
              placeholder="At least 6 characters"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Must include an uppercase letter, a lowercase letter, and be at
              least 6 characters.
            </p>
          </div>

          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Register
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
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;