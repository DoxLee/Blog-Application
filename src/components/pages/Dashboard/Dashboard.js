import Overview from "./components/Overview";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Settings from "./components/Settings";
import { Switch, Link, Route, Redirect, useLocation } from "react-router-dom";
import CreatePost from "../CreatePost/CreatePost";
import { CgMathPlus, CgFileDocument } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";

const Cathegories = [
  {
    title: "Post",
    link: "/dashboard/create-post",
    icon: <CgMathPlus className="text-2xl" />,
  },
  {
    title: "Overview",
    link: "/dashboard/overview",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
  },
  { title: "Articles", link: "/dashboard/articles", icon: <CgFileDocument /> },
  { title: "Settings", link: "/dashboard/Settings", icon: <FiSettings /> },
];
const Dashboard = ({ match }) => {
  let location = useLocation();

  return (
    <div className="min-h-screen max-h-full py-4">
      <div className="grid grid-cols-7 gap-0 h-full shadow-2xl rounded-md py-8">
        <div className="flex flex-col items-center col-span-1  bg-opacity-40 py-4 text-gray-500 bg-white min-h-screen">
          <div className="text-blue-600 text-3xl font-semibold py-8 px-16">
            <Link to="/"> BLOG</Link>
          </div>
          {Cathegories.map((item, index) => (
            <div
              key={Date.now() + index}
              className={` cursor-pointer w-4/5 py-4 rounded-md tracking-wider text-lg ${
                location.pathname === item.link ? "bg-blue-600 text-white" : ""
              }`}
            >
              <Link
                to={item.link}
                className="flex items-center justify-center text-xl font-medium"
              >
                {item.icon}
                <span className="px-3"> {item.title}</span>
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
