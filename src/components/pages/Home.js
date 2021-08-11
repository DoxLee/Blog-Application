import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(3);

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
  }, []);

  const raiseLimit = async () => {
    setLimit((pre) => pre + 3);
  };

  return (
    <div className="lg:grid lg:grid-cols-6 text-gray-600 font-thin ">
      <div className="lg:col-span-1"></div>
      <div className="col-span-6 lg:col-span-4">
        {/* <div className="bg-gray-600 p-6 text-gray-50 my-4 rounded mx-4">
          <span className="block text-center text-3xl tracking-wider">
            Teknoloji
          </span>

          <span className="block text-center text-lg mt-3 tracking-wide">
            Bu bölümde teknoloji ve günden konuları hakkında düşüncelerimi ve
            haberleri paylaşıyorum.
          </span>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-gray-500 my-8 mx-8">
          {posts.map((post, _idx) => (
            <div className="bg-white rounded overflow-hidden shadow-md h-80 lg:h-96 relative hover:shadow-2xl">
              <img
                className="w-full h-32 sm:h-48 object-cover"
                src={`https://source.unsplash.com/random/${_idx}`}
                alt=""
              />
              <div className="lg:m-3 m-2">
                <span className="lg:text-lg font-bold text-gray-600">
                  {post.title}
                </span>
              </div>
              <div className="m-2 lg:mx-3 lg:mb-3">
                <p className="font-semibold line-clamp-3">{post.description}</p>
              </div>
              <div className="absolute right-0 bottom-0 mx-3 mb-3 bg-gray-700 inline-block rounded-full lg:py-2  py-1 transform hover:-rotate-2 hover:-translate-y-1 hover:scale-105 transition ease-out delay-75 hover:bg-gray-600 hover:text-white">
                <Link
                  className="link text-white px-4 py-6 text-xs lg:text-base"
                  to={`/posts/${post._id}`}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center py-6">
          <button
            onClick={raiseLimit}
            className="text-xl font-bold border-2 rounded-full py-2 px-4 border-gray-600 cursor-pointer transform hover:-rotate-2 hover:-translate-y-1 transition ease-out delay-75 hover:bg-gray-600 hover:text-white"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
