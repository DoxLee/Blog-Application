import axios from "axios";
import React, { useEffect, useState } from "react";

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("post Id:", postId);
        let comments = await axios.post(
          "http://localhost:3000/blog/get-comments",
          { postId }
        );
        console.log(comments, "comments");
        setComments(() => comments.data.comments);
      } catch (error) {
        console.log("error comments", error);
      }
    };
    fetchComments();
  }, []);

  return <div>{comments.map((item, index) => item.content)}</div>;
};

export default Comment;
