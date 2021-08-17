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
      <div className="col-span-5 mx-4">
        <div className="flex justify-between py-10 tracking-wider bg-white rounded-lg shadow-lg px-14">
          <div className="text-3xl font-semibold tracking-wider">Articles</div>
          <select
            name="cars"
            className="px-4 py-2 text-lg text-gray-500 border border-gray-400 rounded outline-none"
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
        <div className="mx-3 overflow-y-auto bg-white rounded-lg shadow-md h-3/5">
          <div className="sticky top-0 px-2 py-1 mx-4 text-lg font-semibold tracking-wider text-gray-600 bg-white border-b-2 border-gray-400">
            Recent Edits
          </div>
          <div className="grid grid-cols-7 px-2 mx-1 mx-4 my-2 bg-white rounded-lg ">
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

export default Posts;
