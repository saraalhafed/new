import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getStorageItem } from "../utils/storage";

export default function Header() {
  // State to track hamburger menu open/close
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();
  const firebaseToken =getStorageItem("firebaseToken")
  return (
    <nav className="font-Mali text-marine-blue">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-semibold px-1 md:px-3">
            <img className="h-auto" src="../tor-logo.svg" alt="ToR logo" />
          </Link>
          <Link
            to="/about"
            className="text-lg font-semibold md:text-xl md:px-3"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-lg font-semibold md:text-xl md:px-3"
          >
            Contact
          </Link>
          {/* Hamburger button */}
          <button
            className="absolute right-2 top-6.5 p-2 text-marine-blue rounded-lg focus:outline-none focus:ring-1 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="flex items-center space-x-6 w-full md:w-fit">
          {/* Navigation links */}
          <div
            className={`
              w-full 
            ${isOpen ? "block" : "hidden"}
             md:block md:w-auto`}
          >
            <ul className="flex flex-col items-center space-y-4 font-medium mt-4 md:flex-row md:space-x-9 md:space-y-0 md:mt-0">
              {(userInfo || firebaseToken ) ? (
                <>
                  <li>
                    <Link to="/profile" className="text-lg font-semibold md:text-xl md:px-3">Profile</Link>
                  </li>
                  <button
                    className="btn-primary"
                    onClick={() => logout(navigate)}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <li>
                  <Link
                      to="/login"
                      className="text-lg text-center font-semibold px-3 md:text-xl"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="text-lg text-center font-semibold px-3 md:text-xl"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
