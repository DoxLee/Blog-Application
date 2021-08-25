import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useCookie from "../../hooks/useCokkie";

const Comment = ({ comments, fetchComments }) => {
  const [accesToken, updateAccesToken] = useCookie("acces-token");

  const commentLike = async (commentId) => {
    console.log("liked", commentId);
    try {
      await axios.post(
        "http://localhost:3000/blog/like-comment",
        {
          commentId: commentId,
        },
        {
          headers: {
            "acces-token": accesToken,
          },
        }
      );
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {comments?.map((item, index) => (
        <div key={item._id}>
          <div className="flex py-4 ">
            <div className="flex justify-center pt-3 min-w-max">
              <img
                src="https://randomuser.me/api/portraits/thumb/men/3.jpg"
                alt="user"
                className="w-20 h-20 rounded-md"
              />
            </div>
            <span
              id="comment"
              className="col-span-11 mr-4 border-gray-400 rounded-md"
              type="text"
            >
              <p className="px-4 text-lg font-medium tracking-wide">
                {item?.author?.userName}{" "}
                <p className="inline-block px-2 text-sm text-gray-500">
                  {moment(item?.createdAt).fromNow()}
                </p>
              </p>
              <p className="px-4 py-2 overflow-visible rounded-md">
                {item?.content} Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Doloremque consequuntur et doloribus ab earum
                perferendis eius blanditiis, impedit totam dolor eum nobis
                aliquam. Fugiat rerum cum officiis commodi alias beatae?
              </p>
              <div className="flex text-sm">
                <button
                  className="px-4 py-2 text-gray-600 transition duration-75 ease-out right-4 hover:text-blue-600"
                  onClick={() => commentLike(item._id)}
                >
                  Like
                </button>
                <button className="px-4 py-2 text-gray-600 transition duration-75 ease-out right-4 hover:text-blue-600">
                  Reply
                </button>
                <p className="inline-block px-4 py-2 text-gray-600">
                  {item?.likes?.length} Likes
                </p>
              </div>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
