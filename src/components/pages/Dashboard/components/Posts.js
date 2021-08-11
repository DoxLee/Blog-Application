import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./misc/PostCard";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const postsResponse = await axios.post(
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
      <div className="mx-4 col-span-5">
        <div className="flex justify-between tracking-wider px-14 py-10 bg-white rounded-lg shadow-lg">
          <div className="text-3xl font-semibold tracking-wider">Articles</div>
          <select
            name="cars"
            className="outline-none text-lg py-2 px-4 border border-gray-400 rounded text-gray-500"
          >
            <option value="oldest">Date added(oldest)</option>
            <option value="newest">Date added(newest)</option>
          </select>
        </div>
        <div>
          {posts.map((item, index) => (
            <PostCard data={item} />
          ))}
        </div>
      </div>
      <div className="col-span-2">
        <div className="h-3/5 bg-white mx-3 rounded-lg shadow-md overflow-y-auto">
          <div className="border-b-2 border-gray-400 text-lg tracking-wider text-gray-600 font-semibold px-2 py-1 mx-4 sticky top-0 bg-white">
            Recent Edits
          </div>
          <div className="grid grid-cols-7 bg-white mx-1 px-2 mx-4 my-2 rounded-lg ">
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

export default Posts;
