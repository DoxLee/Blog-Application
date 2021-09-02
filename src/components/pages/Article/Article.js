import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import { FaHeart } from "react-icons/fa";
import useCookie from "../../hooks/useCokkie";
import CommentInput from "./CommentInput";
import moment from "moment";
import "./Article.css";

const Post = ({ match }) => {
  const [Post, setPost] = useState({ likes: [] });
  const [comments, setComments] = useState([]);
  const [accesToken, updateAccesToken] = useCookie("acces-token");
  const { user, setUser } = useContext(UserContext);

  console.log(user);

  useEffect(() => {
    console.log("comments Değişti");
  }, [comments]);

  const fetchComments = async () => {
    console.log("yorum yakalama çalıştı!");
    try {
      let comments = await Axios.post(
        "http://localhost:3000/blog/get-comments",
        { postId: match.params.id }
      );
      console.log(comments.data);
      setComments(() => comments.data);
    } catch (error) {
      console.log("error comments", error);
    }
  };

  // Articles fetch
  const fetchPost = async () => {
    const payload = {
      id: match.params.id,
    };
    try {
      const fetchPost = await Axios.post(
        "http://localhost:3000/blog/get-post",
        payload
      );
      setPost(() => fetchPost.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  console.log(Post);

  const like = async () => {
    try {
      await Axios.post(
        "http://localhost:3000/blog/like-post",
        {
          postId: Post._id,
        },
        {
          headers: {
            "acces-token": accesToken,
          },
        }
      );
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-8 mt-4 lg:mx-56 lg:mt-12 ">
      <div className="py-8 my-4 ">
        <span className="block text-xl tracking-wider text-gray-700 lg:text-3xl">
          {Post.title}
        </span>
        <div className="block mx-4 mt-3 text-base tracking-wide text-gray-500 lg:text-lg">
          {Post.description}
        </div>
      </div>

      <div
        className="mt-5"
        dangerouslySetInnerHTML={{ __html: Post.content }}
      ></div>

      {Post.authorName === user?.user?.userName ? (
        <div>
          <Link className="p-3" to={`/edit/${match.params.id}`}>
            <button
              variant="outline-warning"
              className="mt-3 mb-3 fs-4"
              size="lg"
            >
              Edit
            </button>
          </Link>

          <Link className="p-3" to={`/edit/${match.params.id}`}>
            <button
              variant="outline-danger"
              className="mt-3 mb-3 fs-4"
              size="lg"
            >
              Delete
            </button>
          </Link>
        </div>
      ) : (
        <></>
      )}
      <div className="flex justify-between px-5 mt-8 mb-2">
        <span className="flex flex-col items-center justify-center">
          <FaHeart
            className="text-2xl text-red-600 transition ease-out delay-150 transform cursor-pointer hover:scale-125"
            onClick={like}
          />
          <span className="font-mono text-lg font-medium text-gray-600 transition ">
            <p>{Post.likes.length}</p>
          </span>
        </span>
        <div className="flex items-center px-3 py-2 ">
          <img
            src="https://source.unsplash.com/random/user"
            alt=""
            className="object-cover w-12 h-12 mx-2 rounded-full"
          />
          <div>
            <span className="text-lg">
              <span className="px-1 font-mono text-xl tracking-wider text-gray-600">
                {Post.authorName}
              </span>
              <br />
              <span className="px-1 text-gray-400 text-semibold">
                {moment(Post?.publishAt).fromNow()}
              </span>
            </span>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-400" />
      <CommentInput postId={match.params.id} fetchComments={fetchComments} />
    </div>
  );
};

export default Post;
