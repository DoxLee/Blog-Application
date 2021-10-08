import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(6);

  console.log(posts);

  const fetchPosts = async () => {
    const postsResponse = await Axios.post(
      "http://localhost:3000/blog/get-posts",
      { limit }
    );
    setPosts(() => postsResponse.data);
  };

  // Get posts at the beginging
  useEffect(() => {
    fetchPosts();
  }, [limit]);

  const raiseLimit = async () => {
    setLimit((pre) => pre + 3);
  };

  return (
    <div className="font-thin text-gray-600 lg:grid lg:grid-cols-6 ">
      <div className="lg:col-span-1"></div>
      <div className="col-span-6 lg:col-span-4">
        {/* <div className="p-6 mx-4 my-4 bg-gray-600 rounded text-gray-50">
          <span className="block text-3xl tracking-wider text-center">
            Teknoloji
          </span>

          <span className="block mt-3 text-lg tracking-wide text-center">
            Bu bölümde teknoloji ve günden konuları hakkında düşüncelerimi ve
            haberleri paylaşıyorum.
          </span>
        </div> */}

        <div className="grid grid-cols-1 gap-10 mx-8 my-8 text-gray-500 lg:grid-cols-3 ">
          {posts.map((post, _idx) => (
            <div className="relative overflow-hidden transition duration-150 ease-out transform bg-white rounded h-80 lg:h-96 hover:shadow-2xl hover:-translate-y-1 animate-fade-in-down">
              <img
                className="object-cover w-full h-32 sm:h-48"
                src={post.image?.[0].data_url}
                alt=""
              />
              <div className="m-2 lg:m-3">
                <span className="font-bold text-gray-600 lg:text-lg line-clamp-1">
                  {post.title}
                </span>
              </div>
              <div className="m-2 lg:mx-3 lg:mb-3">
                <p className="font-semibold line-clamp-2">{post.description}</p>
              </div>
              <div className="absolute bottom-0 right-0 inline-block py-1 mx-3 mb-3 transition ease-out delay-75 transform bg-gray-700 rounded-full lg:py-2 hover:-rotate-2 hover:-translate-y-1 hover:scale-105 hover:bg-gray-600 hover:text-white">
                <Link
                  className="px-4 py-6 text-xs text-white link lg:text-base"
                  to={`/article/${post._id}`}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="py-6 text-center">
          <button
            onClick={raiseLimit}
            className="px-4 py-2 text-xl font-bold transition ease-out delay-75 transform border-2 border-gray-600 rounded-full cursor-pointer hover:-rotate-2 hover:-translate-y-1 hover:bg-gray-600 hover:text-white"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
