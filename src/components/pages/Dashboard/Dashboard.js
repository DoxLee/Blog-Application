import Overview from "./components/Overview";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Settings from "./components/Settings";
import { Switch, Link, Route, Redirect, useLocation } from "react-router-dom";
import CreatePost from "../CreatePost/CreatePost";
import { FiSettings, FiPlusCircle, FiEye, FiFileText } from "react-icons/fi";

const Cathegories = [
  {
    title: "Overview",
    link: "/dashboard/overview",
    icon: <FiEye />,
  },
  {
    title: "Post",
    link: "/dashboard/create-post",
    icon: <FiPlusCircle />,
  },
  {
    title: "Articles",
    link: "/dashboard/articles",
    icon: <FiFileText />,
  },
  {
    title: "Settings",
    link: "/dashboard/Settings",
    icon: <FiSettings />,
  },
];
const Dashboard = ({ match }) => {
  let location = useLocation();

  return (
    <div className="max-h-full min-h-screen mx-4 my-4">
      <div className="grid grid-cols-7 gap-0 h-full shadow-2xl rounded-3xl overflow-hidden py-1.5 px-1.5">
        <div className="flex flex-col items-center w-full min-h-screen col-span-1 text-gray-500 bg-opacity-40">
          <div className="w-full px-16 py-4 mb-5 font-mono text-4xl font-semibold text-blue-600">
            <Link to="/"> BLOG</Link>
          </div>
          {Cathegories.map((item, index) => (
            <div
              key={Date.now() + index}
              className={` cursor-pointer w-11/12 py-3 rounded-xl tracking-wider text-lg  ${
                location.pathname === item.link
                  ? "bg-blue-600 text-white shadow-sm"
                  : ""
              }`}
            >
              <Link
                to={item.link}
                className="flex items-center px-8 text-xl font-medium"
              >
                {item.icon}
                <span className="px-3 text-lg"> {item.title}</span>
              </Link>
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
