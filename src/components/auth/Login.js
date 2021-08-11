import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { useHistory } from "react-router";
import useCookie from "../hooks/useCokkie";
import Axios from "axios";
import useForm from "../hooks/useForm";

export default function Login({ tokenLogic }) {
  let history = useHistory();

  const [accesToken, updateAccesToken] = useCookie("acces-token");
  const [refreshToken, updateRefreshToken] = useCookie("refresh-token");

  const [userName, setUserName] = useLocalStorage("");
  const [value, handleChange] = useForm({
    userName,
    password: "",
  });

  const [checkBox, setCheckBox] = useLocalStorage(false);

  const { user, setUser } = useContext(UserContext);

  const [error, setError] = useState();

  useEffect(() => {
    checkBox ? setUserName(value.userName) : setUserName("");
    if (user.login) history.push("/");
  }, [checkBox, value.userName, user.login]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (!value.userName || !value.password) {
        setError("Doldurulmamış Alan var!");
      }
      const loginUser = { userName: value.userName, password: value.password };
      const loginRes = await Axios.post(
        "http://localhost:3000/users/login",
        loginUser
      );

      updateAccesToken(loginRes.data.accesToken);
      updateRefreshToken(loginRes.data.refreshToken);

      // console.log(loginRes.data, accesToken, refreshToken);

      setUser({
        login: true,
        accesToken: loginRes.data.accesToken,
        refreshToken: loginRes.data.refreshToken,
        user: loginRes.data.user,
      });
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="flex justify-center tracking-wide h-full">
      <form className="w-50 p-3 w-1/2" onSubmit={submit}>
        <div className="w-full mb-2">
          <label for="userName" className="label-css">
            Username
          </label>
          <input
            id="userName"
            className="input-css"
            type="text"
            name="userName"
            placeholder="Enter Username"
            value={value.userName}
            onChange={handleChange}
          />
        </div>

        <div className="w-full mb-2">
          <label for="password" className="label-css">
            Password
          </label>
          <input
            className="input-css"
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={value.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between px-2 py-4 ">
          <div>
            <input
              className="text-lg "
              type="checkbox"
              checked={checkBox}
              onChange={() => setCheckBox(!checkBox)}
            />
            <span className="text-lg"> Remember Me!</span>
          </div>
          <div>
            <Link
              to="/forget-password"
              className="underline text-lg hover:text-blue-700 transition"
            >
              Forget Password
            </Link>
          </div>
        </div>

        <div className="flex justify-between">
          <button type="submit" className="input-button-css">
            Login
          </button>

          <Link to="/register" className="input-button-css">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
