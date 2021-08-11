import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../../context/UserContext";

import Axios from "axios";
import Overview from "./components/Overview";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Settings from "./components/Settings";
import { Switch, Link, Route, BrowserRouter } from "react-router-dom";
import CreatePost from "../CreatePost/CreatePost";

const Cathegories = [
  { title: "Post", link: "/dashboard/create-post" },
  { title: "Overview", link: "/dashboard/overview" },
  { title: "Articles", link: "/dashboard/articles" },
  { title: "Settings", link: "/dashboard/Settings" },
];

const Dashboard = ({ match }) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="min-h-screen max-h-full py-4">
      <div className="grid grid-cols-7 gap-0 shadow rounded-md h-full shadow-2xl rounded-md py-8">
        <div className="flex flex-col items-center col-span-1  bg-opacity-40 py-4 text-gray-600 bg-white">
          <div className="text-blue-600 text-3xl font-semibold py-8 px-16">
            BLOG
          </div>
          {Cathegories.map((item, index) => (
            <div
              key={Date.now() + index}
              className={`text-center cursor-pointer w-4/5 py-4 rounded tracking-wider text-lg`}
            >
              <Link to={item.link}> {item.title} </Link>
            </div>
          ))}
        </div>
        <div className="col-span-6">
          <Switch>
            <Route exact path="/dashboard/overview" component={Overview} />
            <Route exact path="/dashboard/articles" component={Posts} />
            <Route exact path="/dashboard/create-post" component={CreatePost} />
            <Route exact path="/dashbaord/users" component={Users} />
            <Route exact path="/dashboard/settings" component={Settings} />
          </Switch>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
