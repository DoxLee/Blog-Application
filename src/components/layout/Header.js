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
    <header className="sticky top-0 z-50 p-3 text-gray-600 bg-white border-b-2 border-gray-200 ">
      <div className="flex items-center justify-around tracking-wider">
        <div>
          <Link
            className="text-lg transition link lg:text-2xl hover:text-gray-800"
            to="/"
          >
            Blog App
          </Link>
        </div>

        <div className="flex items-center justify-center">
          {user.login ? (
            <div className="relative">
              <span
                className="block text-lg text-center cursor-pointer lg:text-2xl"
                onClick={() => setDropDown((pre) => !pre)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="inline-block h-6 mx-2 text-gray-900 hover:text-blue-500"
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
                <div className="absolute text-xs bg-gray-100 rounded lg:text-lg ">
                  <Link className="block px-4 py-2 transition ease-out delay-75 rounded link hover:text-blue-500 hover:bg-gray-50">
                    Profile
                  </Link>
                  <Link className="block px-4 py-2 transition ease-out delay-75 rounded link hover:text-blue-500 hover:bg-gray-50">
                    Settings
                  </Link>
                  <Link className="block px-4 py-2 transition ease-out delay-75 rounded link hover:text-blue-500 hover:bg-gray-50">
                    Friends
                  </Link>
                  <Link
                    to="/dashboard/overview"
                    className="block px-4 py-2 transition ease-out delay-75 rounded link hover:text-blue-500 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="block px-4 py-2 transition ease-out delay-75 rounded link hover:text-blue-500 hover:bg-gray-50 "
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
                  className="text-base transition link lg:text-lg hover:bg-gray-100 hover:text-gray-900"
                  to="/login"
                >
                  Log in
                </Link>
              </span>
              <span>
                <Link
                  className="text-base transition link lg:text-lg hover:bg-gray-100 hover:text-gray-900"
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
