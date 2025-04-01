import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useState } from "react";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          {/* Left - Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold flex items-center transition-all hover:scale-105">
              🧑‍💻 DevTinder
            </Link>
          </div>

         

          {/* Right - User Profile */}
          {user && (
            <div className="flex items-center gap-4">
              <p className="text-white hidden sm:block">Welcome, {user.firstName}</p>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-white hover:ring-2 hover:ring-purple-300 transition-all"
                >
                  <img alt="userPhoto" src={user.photoUrl} className="w-full h-full object-cover" />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <ul className="absolute right-0 mt-3 w-48 bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden transition-all animate-fadeIn">
                    <li className="border-b px-4 py-2 hover:bg-gray-100 transition">
                      <Link to="/profile" onClick={() => setIsOpen(false)}>👤 Profile</Link>
                    </li>
                    <li className="border-b px-4 py-2 hover:bg-gray-100 transition">
                      <Link to="/requests" onClick={() => setIsOpen(false)}>📩 Requests</Link>
                    </li>
                    <li className="border-b px-4 py-2 hover:bg-gray-100 transition">
                      <Link to="/connections" onClick={() => setIsOpen(false)}>🤝 Connections</Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 transition"
                      >
                        🚪 Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
