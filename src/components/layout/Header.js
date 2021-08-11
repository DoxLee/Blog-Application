import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import "../../index.css";
import useCookie from "../hooks/useCokkie";
import { Link, useHistory } from "react-router-dom";
import { HiMenu } from "react-icons/hi";

const Header = () => {
  let history = useHistory();

  const [dropdown, setDropDown] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [accesToken, updateAccesToken] = useCookie("acces-token");
  const [refreshToken, updateRefreshToken] = useCookie("refresh-token");

  const logout = async (e) => {
    e.preventDefault();

    setUser({
      login: false,
      accesToken: "",
      refreshToken: "",
      user: "",
    });

    updateRefreshToken("");
    updateAccesToken("");

    history.push("/");
  };

  return (
    <header className=" border-b-2 border-gray-200 sticky top-0 z-50 bg-white text-gray-600 p-3">
      <div className="flex justify-around items-center tracking-wider">
        <div>
          <Link
            className="link lg:text-2xl text-lg hover:text-blue-500 transition"
            to="/"
          >
            Blog App
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <Link to="/about" className="link hover:text-blue-500">
            About
          </Link>
          {user.login ? (
            <div className="relative">
              <span
                className="text-lg lg:text-2xl cursor-pointer text-center block"
                onClick={() => setDropDown((pre) => !pre)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="inline-block text-gray-900 mx-2 h-6 hover:text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
              {dropdown && (
                <div className="bg-gray-100 text-xs lg:text-lg absolute rounded ">
                  <Link className="link block px-4 py-2 hover:text-blue-500 hover:bg-gray-50  transition ease-out delay-75 rounded">
                    Profile
                  </Link>
                  <Link className="link block px-4 py-2 hover:text-blue-500 hover:bg-gray-50  transition ease-out delay-75 rounded">
                    Settings
                  </Link>
                  <Link className="link block px-4 py-2 hover:text-blue-500 hover:bg-gray-50  transition ease-out delay-75 rounded">
                    Friends
                  </Link>
                  <Link
                    to="/dashboard"
                    className="link block px-4 py-2 hover:text-blue-500 hover:bg-gray-50  transition ease-out delay-75 rounded"
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="link block px-4 py-2 hover:text-blue-500 hover:bg-gray-50  transition ease-out delay-75 rounded"
                    onClick={logout}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div>
              <span>
                <Link
                  className="link text-base lg:text-lg hover:bg-gray-100 hover:text-gray-900 transition"
                  to="/login"
                >
                  Log in
                </Link>
              </span>
              <span>
                <Link
                  className="link text-base lg:text-lg hover:bg-gray-100 hover:text-gray-900 transition"
                  to="/register"
                >
                  Sign in
                </Link>
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
