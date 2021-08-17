import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import { FaHeart } from "react-icons/fa";

const Article = ({ match }) => {
  const [Article, setArticle] = useState({});

  const { user, setUser } = useContext(UserContext);

  console.log(user);

  // Articles fetch
  useEffect(() => {
    const fetchArticle = async () => {
      const payload = {
        id: match.params.id,
      };
      try {
        const fetchArticle = await Axios.Article(
          "http://localhost:3000/blog/get-Article",
          payload
        );
        setArticle(() => fetchArticle.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticle();
  }, []);

  const like = async () => {
    
  }

  return (
    <div className="mx-8 mt-4 lg:mx-56 lg:mt-12 ">
      <div className="py-8 my-4 bg-gray-600 rounded text-gray-50">
        <span className="block px-6 text-lg tracking-wider lg:text-3xl">
          {Article.title}
        </span>
        <div className="block px-6 mt-3 text-base tracking-wide lg:text-lg">
          {Article.description}
        </div>
      </div>

      <div className="flex items-center px-3 py-2 border-b-2 border-gray-500">
        <img
          src="https://source.unsplash.com/random/user"
          alt=""
          className="object-cover w-12 h-12 mx-2 rounded-full"
        />
        <div>
          <span className="text-lg">
            <span className="px-1 font-mono text-xl tracking-wider text-gray-600">
              {Article.authorName}
            </span>
            <br />
            <span className="px-1 text-gray-400 text-semibold">11.09.2000</span>
          </span>
        </div>
      </div>

      <div
        className="mt-5"
        dangerouslySetInnerHTML={{ __html: Article.content }}
      ></div>

      {Article.authorName === user.user.userName ? (
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
      <div className="flex mt-8 mb-2">
        <span className="flex flex-col items-center justify-center">
          <FaHeart
            className="text-2xl text-red-600 transition ease-out delay-150 transform cursor-pointer hover:-translate-y-1 hover:scale-125"
            onClick={() => console.log("You liked")}
          />
          <span className="font-mono text-lg font-medium">4.864</span>
        </span>
      </div>
    </div>
  );
};

export default Article;
