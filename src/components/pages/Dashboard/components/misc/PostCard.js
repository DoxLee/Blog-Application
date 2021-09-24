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

  } = data;
  return (
    <div className="relative flex items-center py-4 my-4 bg-white rounded-md shadow shadow-md">
      <img
        className="object-cover w-32 w-full h-32 p-6 rounded-full sm:h-40 sm:w-40"
        src={`https://source.unsplash.com/random/${Math.random() * 100}`}
        alt="Post Card"
      />
      <div className="relative w-8/12 h-32">
        <span className="block text-xl font-semibold text-gray-600 line-clamp-1">
          {title}
        </span>
        <span className="text-base text-gray-500 line-clamp-2 ">
          {description}
        </span>
        <span className="absolute bottom-0 left-0 bg-blue-400 text-lg text-white tracking-wide font-semibold py-1.5 px-2.5 rounded-md">
          #Technology
        </span>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex items-center justify-center">
          <span className="inline-block px-3">{svg.likes}</span>
          <span className="font-mono text-xl font-semibold">6,962</span>
        </div>
        <div className="flex items-center justify-center">
          <span className="inline-block px-3">{svg.comments}</span>
          <span className="font-mono text-xl font-semibold">5,842</span>
        </div>
        <div className="flex items-center justify-center">
          <span className="inline-block px-3">{svg.share}</span>
          <span className="font-mono text-xl font-semibold">1,992</span>
        </div>
        <div className="flex items-center justify-center">
          <span className="inline-block px-3">{svg.eye}</span>
          <span className="font-mono text-xl font-semibold">9,998</span>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 mx-4 my-2 font-semibold capitalize">
        {moment(createdAt).fromNow()} Posted by{" "}
        <span className="font-bold"> {authorName} </span>
      </div>
      <Link
        className="absolute top-0 right-0 mx-4 mt-2 cursor-pointer"
        to={`/edit/${_id}`}
      >
        {svg.edit}
      </Link>
    </div>
  );
};

export default PostCard;
