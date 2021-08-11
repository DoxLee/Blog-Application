import React from "react";
import moment from "moment";
import { svg } from "./svg";
import { Link } from "react-router-dom";

const PostCard = ({ data }) => {
  console.log(data);
  const {
    _id,
    title,
    authorName,
    createdAt,
    description,
    likes = "8,746",
  } = data;
  return (
    <div className="flex items-center bg-white py-4 rounded-md shadow relative shadow-md my-4 py-4">
      <img
        className="h-32 w-32 sm:h-40 sm:w-40 rounded-full object-cover  p-6 w-full object-cover"
        src={`https://source.unsplash.com/random/${Math.random() * 100}`}
        alt="Post Card"
      />

      <div className="relative w-8/12 h-32">
        <span className="text-xl text-gray-600 block font-semibold ">
          {title}
        </span>
        <span className="text-base text-gray-500">{description}</span>
        <span className="absolute bottom-0 left-0 bg-blue-400 text-lg text-white tracking-wide font-semibold py-1.5 px-2.5 rounded-md">
          #Technology
        </span>
      </div>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex justify-center items-center">
          <span className="inline-block px-3">{svg.likes}</span>
          <span className="text-xl font-mono font-semibold">6,962</span>
        </div>
        <div className="flex justify-center items-center">
          <span className="inline-block px-3">{svg.comments}</span>
          <span className="text-xl font-mono font-semibold">5,842</span>
        </div>
        <div className="flex justify-center items-center">
          <span className="inline-block px-3">{svg.share}</span>
          <span className="text-xl font-mono font-semibold">1,992</span>
        </div>
        <div className="flex justify-center items-center">
          <span className="inline-block px-3">{svg.eye}</span>
          <span className="text-xl font-mono font-semibold">9,998</span>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 my-2 mx-4 font-semibold capitalize">
        {moment(createdAt).fromNow()} Posted by{" "}
        <span className="font-bold"> {authorName} </span>
      </div>
      <Link
        className="absolute right-0 top-0 mt-2 mx-4 cursor-pointer"
        to={`/edit/${_id}`}
      >
        {svg.edit}
      </Link>
    </div>
  );
};

export default PostCard;
