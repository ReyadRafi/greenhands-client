import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
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
    `hover:text-green-700 transition ${
      isActive ? "text-green-700 font-semibold" : "text-gray-700"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-green-700 shrink-0">
          GreenHands 🌱
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLink to="/upcoming-events" className={navLinkClass}>
            Upcoming Events
          </NavLink>

          {!user && (
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
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
                  src={user.photoURL || "https://i.ibb.co/2kR3Xz1/default-avatar.png"}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full border-2 border-green-600 object-cover"
                />
                {/* Custom hover tooltip showing display name */}
                <span className="pointer-events-none absolute -bottom-9 right-0 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  {user.displayName || "User"}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <Link
                    to="/create-event"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-green-50"
                  >
                    Create Event
                  </Link>
                  <Link
                    to="/manage-events"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-green-50"
                  >
                    Manage Events
                  </Link>
                  <Link
                    to="/joined-events"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-green-50"
                  >
                    Joined Events
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 border-t pt-3">
          <NavLink to="/upcoming-events" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
            Upcoming Events
          </NavLink>

          {!user && (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-center"
            >
              Login
            </Link>
          )}

          {user && (
            <>
              <div className="flex items-center gap-2 py-2 border-b pb-3">
                <img
                  src={user.photoURL || "https://i.ibb.co/2kR3Xz1/default-avatar.png"}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium">{user.displayName}</span>
              </div>
              <Link to="/create-event" onClick={() => setMobileMenuOpen(false)}>
                Create Event
              </Link>
              <Link to="/manage-events" onClick={() => setMobileMenuOpen(false)}>
                Manage Events
              </Link>
              <Link to="/joined-events" onClick={() => setMobileMenuOpen(false)}>
                Joined Events
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-red-600"
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