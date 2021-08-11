import React, { useEffect, useState } from "react";
import Card from "./misc/Card";
import Axios from "axios";
import { svg } from "./misc/svg";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Charts from "./misc/Charts";
import PostCard from "./misc/PostCard";

const cardData = {
  viewed: {
    title: "Viewed",
    icon: svg.eye,
    value: "128,468",
  },
  users: {
    title: "Users",
    icon: svg.users,
    value: "26,462",
  },
  posts: {
    title: "Posts",
    icon: svg.document,
    value: "142",
  },
  comments: {
    title: "Comments",
    icon: svg.comments,
    value: "52,468",
  },
  likes: {
    title: "Likes",
    icon: svg.likes,
    value: "68,432",
  },
};

const data = [
  {
    name: "Monday",
    view: 3678,
  },
  {
    name: "Tuesday",
    view: 3277,
  },
  {
    name: "Wednesday",
    view: 2658,
  },
  {
    name: "Thursday",
    view: 7241,
  },
  {
    name: "Friday",
    view: 2473,
  },
  {
    name: "Saturday",
    view: 5618,
  },
  {
    name: "Sunday",
    view: 4628,
  },
];

const Overview = () => {
  const [posts, setPosts] = useState([{}]);

  const fetchPosts = async () => {
    const postsResponse = await Axios.post(
      "http://localhost:3000/blog/get-posts",
      null
    );
    setPosts(() => postsResponse.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="grid grid-cols-7">
      <div className="col-span-5">
        <div className="grid grid-cols-5 gap-8">
          {Object.keys(cardData).map((item, key) => (
            <Card
              title={cardData[item].title}
              icon={cardData[item].icon}
              value={cardData[item].value}
            />
          ))}
        </div>
        <div className="py-4 flex w-full">
          <div className="relative md:w-2/3 w-full bg-white py-4 px-2 rounded-md mr-4 pt-12">
            <Charts data={data} />
            <div className="absolute top-0 left-0 mx-6 my-3">
              <span className="text-2xl text-bold font-mono text-gray-800">
                Visitors
              </span>
            </div>
          </div>
          <div className="px-6 py-6 bg-white rounded-md ml -6 md:w-1/3 text-gray-500">
            <div className="text-lg font-bold border-b-2 border-gray-400 p-1 text-gray-700">
              Top social Media Shared
            </div>
            <div className="flex items-center justify-between py-3 cursor-pointer">
              <div>
                <FaFacebook className=" w-6 h-6 inline-block text-blue-600" />
                <span className="text-lg text-semibold px-2">Facebook</span>
              </div>
              <span className="text-lg text-semibold px-2">42,268</span>
            </div>
            <div className="flex items-center  justify-between py-3 cursor-pointer">
              <div>
                <FaTwitter className="w-6 h-6 inline-block text-blue-500" />
                <span className="text-lg text-semibold px-2">Twitter</span>
              </div>
              <div className="text-lg text-semibold px-2 text-right">
                12,268
              </div>
            </div>
            <div className="flex items-center justify-between py-3 cursor-pointer">
              <div>
                <FaInstagram className="w-6 h-6 inline-block text-indigo-700 " />
                <span className="text-lg  text-semibold px-2">Instagram</span>
              </div>
              <span className="text-lg text-semibold px-2">62,268</span>
            </div>
            <div className="flex items-center justify-between py-3 cursor-pointer">
              <div>
                <FaGithub className="text-gray-800 w-6 h-6 inline-block" />
                <span className="text-lg  text-semibold px-2">Github</span>
              </div>
              <span className="text-lg text-semibold px-2">128</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-2xl font-bold tracking-wider text-gray-500 px-4">
            Last Article
          </div>

          <PostCard data={posts[0]} />
        </div>
      </div>
      <div className="col-span-2">
        <div className="h-3/5 bg-white mx-3 rounded-lg shadow-md overflow-y-auto">
          <div className="border-b-2 border-gray-400 text-lg tracking-wider text-gray-600 font-semibold px-2 py-1 mx-4 sticky top-0 bg-white">
            Recent Comments
          </div>
          <div className="grid grid-cols-6 bg-white mx-1 px-2 mx-4 my-2 rounded-lg ">
            <div className="flex h-full items-center">
              <img
                className="h-14 w-14 rounded object-cover inline "
                src={`https://source.unsplash.com/random/${
                  Math.random() * 100
                }`}
                alt="user img"
              />
            </div>
            <div className="col-span-5  pl-2 ">
              <div className="flex flex-col ">
                <div className="flex items-center justify-between font-semibold tracking-wider text-base text-gray-800">
                  <span>Random</span>
                  <span className="px-1 text-sm text-gray-400">
                    2 hours ago
                  </span>
                </div>
                <div className="text-gray-600 font-normal tracking-wide text-sm">
                  Lorem ipsum dolor, sit amet conse r adipisicing elit.{" "}
                </div>
              </div>
            </div>
          </div>
          {new Array(10).fill().map((_, id) => (
            <div className="grid grid-cols-6 bg-white mx-1 px-2 mx-4 my-2 rounded-lg ">
              <div className="flex h-full items-center">
                <img
                  className="h-14 w-14 rounded object-cover inline "
                  src={`https://source.unsplash.com/random/${
                    Math.random() * 100
                  }`}
                  alt="user img"
                />
              </div>
              <div className="col-span-5  pl-2 ">
                <div className="flex flex-col ">
                  <div className="flex items-center justify-between font-semibold tracking-wider text-base text-gray-800">
                    <span>Random</span>
                    <span className="px-1 text-sm text-gray-400">
                      {1 + id} hours ago
                    </span>
                  </div>
                  <div className="text-gray-600 font-normal tracking-wide text-sm">
                    Lorem ipsum dolor, sit amet conse adipisicing elit.{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
