import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Post = ({ match }) => {
  const [post, setPost] = useState({});

  const { user, setUser } = useContext(UserContext);

  console.log(user);

  // Posts fetch
  useEffect(() => {
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
    fetchPost();
  }, []);

  return (
    <div className="lg:mx-56 lg:mt-12 mx-8 mt-4 ">
      <div className="bg-gray-600 py-8 text-gray-50 my-4 rounded">
        <span className="block text-lg lg:text-3xl tracking-wider px-6">
          {post.title}
        </span>
        <div className="block text-base lg:text-lg mt-3 tracking-wide px-6">
          {post.description}
        </div>
      </div>

      <div className="flex items-center  py-2 px-3 border-b-2 border-gray-500">
        <img
          src="https://source.unsplash.com/random/user"
          alt=""
          className="h-12 w-12 rounded-full object-cover mx-2"
        />
        <div>
          <span className="text-lg">
            <span className="px-1 text-xl tracking-wider text-gray-600 font-mono">
              {post.authorName}
            </span>
            <br />
            <span className="text-semibold px-1 text-gray-400">11.09.2000</span>
          </span>
        </div>
      </div>

      <div
        className="mt-5"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      {post.authorName === user.user.userName ? (
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
    </div>
  );
};

export default Post;
