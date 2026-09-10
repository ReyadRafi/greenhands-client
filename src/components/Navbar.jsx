import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import ThemeContext from "../context/ThemeContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success("Logged out successfully");
        setDropdownOpen(false);
      })
      .catch(() => {
        toast.error("Something went wrong while logging out");
      });
  };

  const navLinkClass = ({ isActive }) =>
  `hover:text-green-700 dark:hover:text-green-400 transition ${
    isActive ? "text-green-700 dark:text-green-400 font-semibold" : "text-gray-700 dark:text-gray-300"
  }`;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-green-700 dark:text-green-400 shrink-0"
        >
          GreenHands 🌱
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLink to="/upcoming-events" className={navLinkClass}>
            Upcoming Events
          </NavLink>

          {/* 🌙 Theme Toggle — Desktop */}
          <button
            onClick={toggleTheme}
            className="text-xl w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            title="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {!user && (
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition"
            >
              Login
            </Link>
          )}

          {user && (
            <div className="relative">
              {/* Profile picture - hover shows name via title, click toggles dropdown */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="group relative"
                title={user.displayName || "User"}
              >
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/2kR3Xz1/default-avatar.png"
                  }
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full border-2 border-green-600 dark:border-green-400 object-cover"
                />
                {/* Custom hover tooltip showing display name */}
                <span className="pointer-events-none absolute -bottom-9 right-0 whitespace-nowrap bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  {user.displayName || "User"}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50">
                  <Link
                    to="/create-event"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-green-50 dark:hover:bg-gray-700 dark:text-gray-200"
                  >
                    Create Event
                  </Link>
                  <Link
                    to="/manage-events"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-green-50 dark:hover:bg-gray-700 dark:text-gray-200"
                  >
                    Manage Events
                  </Link>
                  <Link
                    to="/joined-events"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-green-50 dark:hover:bg-gray-700 dark:text-gray-200"
                  >
                    Joined Events
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-2xl text-gray-700 dark:text-gray-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 border-t border-gray-200 dark:border-gray-700 pt-3">
          <NavLink
            to="/upcoming-events"
            className={navLinkClass}
            onClick={() => setMobileMenuOpen(false)}
          >
            Upcoming Events
          </NavLink>

          {/* 🌙 Theme Toggle — Mobile */}
          <button
            onClick={toggleTheme}
            className="text-left flex items-center gap-2 text-gray-700 dark:text-gray-200"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>

          {!user && (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-center hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition"
            >
              Login
            </Link>
          )}

          {user && (
            <>
              <div className="flex items-center gap-2 py-2 border-b border-gray-200 dark:border-gray-700 pb-3">
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/2kR3Xz1/default-avatar.png"
                  }
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user.displayName}
                </span>
              </div>
              <Link
                to="/create-event"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 dark:text-gray-200"
              >
                Create Event
              </Link>
              <Link
                to="/manage-events"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 dark:text-gray-200"
              >
                Manage Events
              </Link>
              <Link
                to="/joined-events"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 dark:text-gray-200"
              >
                Joined Events
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-red-600 dark:text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;