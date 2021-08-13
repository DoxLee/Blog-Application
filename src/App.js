import { useState, useEffect } from "react";
import "./index.css";
import useCookie from "./components/hooks/useCokkie";
import UserContext from "./context/UserContext";
import { Switch, Route, useLocation } from "react-router-dom";
import { isTokenExpired } from "./functions/JWTFunctions";
import Login from "./components/auth/Login";
import Axios from "axios";
import Home from "./components/pages/Home";
import Register from "./components/auth/Register";
import Header from "./components/layout/Header";
import EditPost from "./components/pages/EditPost";
import Post from "./components/pages/Post";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import CreatePost from "./components/pages/CreatePost/CreatePost";

const Routes = {
  register: "/register",
  login: "/login",
  logout: "/logout",
  getAccesToken: "/get-acces-token",
  isLoggedIn: "/is-logged-in",
  changePassword: "/change-password",
};

function App() {
  let location = useLocation();

  console.log(location);

  const [user, setUser] = useState({
    accesToken: undefined,
    refreshToken: undefined,
    user: {
      userName: undefined,
      id: undefined,
    },
    login: false,
  });

  const [isLoading, setLoading] = useState(true);
  const [accesToken, updateAccesToken] = useCookie("acces-token");
  const [refreshToken] = useCookie("refresh-token");

  useEffect(() => {
    const auth = async () => {
      try {
        if (isTokenExpired(accesToken) && refreshToken) {
          const getAccesToken = await Axios.post(
            "http://localhost:3000/users/get-acces-token",
            null,
            { headers: { "refresh-token": refreshToken } }
          );
          updateAccesToken(getAccesToken.data.accesToken);
        }
        const loggedInResponse = await Axios.post(
          "http://localhost:3000/users/is-logged-in",
          null,
          {
            headers: {
              "acces-token": accesToken,
            },
          }
        );
        setUser({
          login: true,
          accesToken,
          refreshToken,
          user: loggedInResponse.data.user,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    auth();
  }, []);

  return (
    <div className="App bg-gray-50 min-h-screen max-h-full antialiased">
      <UserContext.Provider value={{ user, setUser }}>
        {isLoading ? (
          "loading"
        ) : (
          <>
            {location.pathname.includes("/dashboard") ? <></> : <Header />}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/createBlog" component={CreatePost} />
              <Route path="/posts/:id" component={Post} />
              <Route path="/dashboard">
                <Dashboard />
              </Route>
            </Switch>
          </>
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
