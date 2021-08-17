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
        <div className="flex w-full py-4">
          <div className="relative w-full px-2 py-4 pt-12 mr-4 bg-white rounded-md md:w-2/3">
            <Charts data={data} />
            <div className="absolute top-0 left-0 mx-6 my-3">
              <span className="font-mono text-2xl text-gray-800 text-bold">
                Visitors
              </span>
            </div>
          </div>
          <div className="px-6 py-6 text-gray-500 bg-white rounded-md ml -6 md:w-1/3">
            <div className="p-1 text-lg font-bold text-gray-700 border-b-2 border-gray-400">
              Top social Media Shared
            </div>
            <div className="flex items-center justify-between py-3 cursor-pointer">
              <div>
                <FaFacebook className="inline-block w-6 h-6 text-blue-600 " />
                <span className="px-2 text-lg text-semibold">Facebook</span>
              </div>
              <span className="px-2 text-lg text-semibold">42,268</span>
            </div>
            <div className="flex items-center justify-between py-3 cursor-pointer">
              <div>
                <FaTwitter className="inline-block w-6 h-6 text-blue-500" />
                <span className="px-2 text-lg text-semibold">Twitter</span>
              </div>
              <div className="px-2 text-lg text-right text-semibold">
                12,268
              </div>
            </div>
            <div className="flex items-center justify-between py-3 cursor-pointer">
              <div>
                <FaInstagram className="inline-block w-6 h-6 text-indigo-700 " />
                <span className="px-2 text-lg text-semibold">Instagram</span>
              </div>
              <span className="px-2 text-lg text-semibold">62,268</span>
            </div>
            <div className="flex items-center justify-between py-3 cursor-pointer">
              <div>
                <FaGithub className="inline-block w-6 h-6 text-gray-800" />
                <span className="px-2 text-lg text-semibold">Github</span>
              </div>
              <span className="px-2 text-lg text-semibold">128</span>
            </div>
          </div>
        </div>

        <div>
          <div className="px-4 text-2xl font-bold tracking-wider text-gray-500">
            Last Article
          </div>

          <PostCard data={posts[0]} />
        </div>
      </div>
      <div className="col-span-2">
        <div className="mx-3 overflow-y-auto bg-white rounded-lg shadow-md h-3/5">
          <div className="sticky top-0 px-2 py-1 mx-4 text-lg font-semibold tracking-wider text-gray-600 bg-white border-b-2 border-gray-400">
            Recent Comments
          </div>
          <div className="grid grid-cols-6 px-2 mx-1 mx-4 my-2 bg-white rounded-lg ">
            <div className="flex items-center h-full">
              <img
                className="inline object-cover rounded h-14 w-14 "
                src={`https://source.unsplash.com/random/${
                  Math.random() * 100
                }`}
                alt="user img"
              />
            </div>
            <div className="col-span-5 pl-2 ">
              <div className="flex flex-col ">
                <div className="flex items-center justify-between text-base font-semibold tracking-wider text-gray-800">
                  <span>Random</span>
                  <span className="px-1 text-sm text-gray-400">
                    2 hours ago
                  </span>
                </div>
                <div className="text-sm font-normal tracking-wide text-gray-600">
                  Lorem ipsum dolor, sit amet conse r adipisicing elit.{" "}
                </div>
              </div>
            </div>
          </div>
          {new Array(10).fill().map((_, id) => (
            <div className="grid grid-cols-6 px-2 mx-1 mx-4 my-2 bg-white rounded-lg ">
              <div className="flex items-center h-full">
                <img
                  className="inline object-cover rounded h-14 w-14 "
                  src={`https://source.unsplash.com/random/${
                    Math.random() * 100
                  }`}
                  alt="user img"
                />
              </div>
              <div className="col-span-5 pl-2 ">
                <div className="flex flex-col ">
                  <div className="flex items-center justify-between text-base font-semibold tracking-wider text-gray-800">
                    <span>Random</span>
                    <span className="px-1 text-sm text-gray-400">
                      {1 + id} hours ago
                    </span>
                  </div>
                  <div className="text-sm font-normal tracking-wide text-gray-600">
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
