import axios from "axios";
import React, { useContext, useState } from "react";
import { CgComment } from "react-icons/cg";
import UserContext from "../../../context/UserContext";

const CommentInput = ({ postId, fetchComments }) => {
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);

  const submit = async () => {
    let paylaod = {
      postId: postId,
      content: comment,
    };
    try {
      const commentResponse = await axios.post(
        "http://localhost:3000/blog/comment-post",
        paylaod,
        {
          headers: {
            "acces-token": user.accesToken,
          },
        }
      );
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-gray-600 bg-gray-100 px-2.5 py-1.5 rounded-md">
      <div name="description-input">
        <label htmlFor="comment" className="flex items-center label-comment">
          <CgComment className="mx-2" /> Comments
        </label>
        <div className="grid grid-cols-12 my-3">
          <div className="flex items-center justify-center ">
            <img
              src="https://source.unsplash.com/random/user"
              alt="user"
              className="w-20 h-20 rounded-full"
            />
          </div>
          <textarea
            id="comment"
            className="col-span-11 input-comment"
            type="text"
            name="description"
            placeholder="Enter Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end min-w-full">
        <button type="button" className="comment-button" onClick={submit}>
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
