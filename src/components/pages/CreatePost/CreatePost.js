import React, { useState, useRef, useEffect, useContext } from "react";
import { svg } from "../Dashboard/components/misc/svg";
import useLocalStorage from "../../hooks/useLocalStorage";
import ImageUploading from "react-images-uploading";
import UserContext from "../../../context/UserContext";
import Axios from "axios";
import Editor from "./Editor";
import "./CreatePost.css";
import moment from "moment";

const CreatePost = () => {
  const [selected, setSelected] = useState("add-post");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cathegory, setCathegory] = useState([]);
  const [tag, setTag] = useState([]);

  const [time, setTime] = useState(moment().format("HH:mm"));
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  // Milisecond for mongodb
  const [publishAt, setPublishAt] = useState(
    new Date(`${moment().format("YYYY-MM-DD HH:mm")}`).getTime()
  );

  // Date to milisecond
  useEffect(() => {
    setPublishAt(() =>
      new Date(`${moment().format(`${date} ${time}`)}`).getTime()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, date]);

  const [modal, setModal] = useState({ cathegory: true, tag: true });
  const [cathegoryValue, setCathegoryValue] = useState(undefined);
  const [tagValue, setTagValue] = useState(undefined);
  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      image,
      title,
      description,
      content,
      cathegory,
      tag,
      publishAt,
    };
    try {
      const blogPostRes = await Axios.post(
        "http://localhost:3000/blog/create-blog-post",
        payload,
        {
          headers: {
            "access-token": user.accesToken,
          },
        }
      );

      if (blogPostRes.data.err) console.log(blogPostRes.data);

      alert("Saved Succesfully");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container px-2 mx-auto tracking-wide text-gray-600">
      {selected === "add-post" ? (
        <div>
          <div className="inline-block w-4/5 align-top">
            <div className="mb-2 align-top">
              <div className="inline-block w-3/5 px-4 py-2 align-top lg:w-1/4">
                <ImageUploading
                  value={image}
                  onChange={(image) => setImage(image)}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    <div className="relative rounded-md">
                      {imageList.length ? (
                        <div>
                          <img
                            src={imageList[0]["data_url"]}
                            alt="cover"
                            className="inline-block object-cover w-full h-32 rounded sm:h-48"
                          />
                          <span
                            onClick={() => onImageRemove(0)}
                            className="absolute top-0 left-0 px-2 py-2 mx-2 my-2 transition duration-150 ease-in bg-white bg-opacity-50 rounded-full hover:text-red-600 hover:bg-gray-200"
                          >
                            {svg.trash}
                          </span>
                        </div>
                      ) : (
                        <div
                          {...dragProps}
                          onClick={onImageUpload}
                          className="flex items-center justify-center w-full h-64 text-xl text-center border-2 border-gray-600 border-dashed rounded-md shadow-inner cursor-pointer input-button"
                          style={isDragging ? { color: "red" } : undefined}
                        >
                          Click or Drop here
                        </div>
                      )}
                      &nbsp;
                    </div>
                  )}
                </ImageUploading>
              </div>
              <div className="inline-block w-2/5 align-top lg:w-3/4">
                <div>
                  <div name="title-input">
                    <label htmlFor="title" className="text-gray-600 label-css ">
                      Title
                    </label>
                    <input
                      id="title"
                      className="input-css"
                      type="text"
                      name="title"
                      placeholder="Enter Title"
                      value={title}
                      onChange={(e) => setTitle(() => e.target.value)}
                    />
                  </div>
                  <div name="description-input">
                    <label htmlFor="description" className="label-css ">
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="input-css"
                      type="text"
                      name="description"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Editor setContent={setContent} />
          </div>
          <div className="inline-block w-1/5 px-3 align-top">
            <div>
              <div className="text-gray-500 font-medium py-1.5">Author</div>
              <div className="flex px-2 py-2 bg-white rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="px-2 font-medium text-gray-600">
                  {user?.user?.userName}
                </div>
              </div>
            </div>
            <div className="py-2">
              <div className="text-gray-500 font-medium py-1.5">Post Date</div>
              <div className="grid grid-cols-5 gap-2">
                <input
                  type="date"
                  className="col-span-3 text-gray-600 outline-none date-css"
                  defaultValue={date}
                  onChange={(e) => setDate(() => e.target.value)}
                />
                <input
                  type="time"
                  defaultValue={time}
                  onChange={(e) => setTime(() => e.target.value)}
                  className="col-span-2 outline-none date-css"
                />
              </div>
              <div className="py-2">
                <label
                  for="toggle"
                  class="text-base font-medium text-gray-600 pr-2.5"
                >
                  Publish Now
                </label>
                <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    onChange={(e) =>
                      e.target.value === true
                        ? setPublishAt(new Date().getTime())
                        : setPublishAt(() =>
                            new Date(
                              `${moment().format(`${date} ${time}`)}`
                            ).getTime()
                          )
                    }
                    class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    for="toggle"
                    class="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-gray-500 font-medium py-1.5">
                <p>Cathegory</p>
                <span className="mr-2 rounded-full ">
                  {modal?.cathegory ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() =>
                        setModal((pre) => {
                          return { ...pre, cathegory: !pre.cathegory };
                        })
                      }
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() =>
                        setModal((pre) => {
                          return { ...pre, cathegory: !pre.cathegory };
                        })
                      }
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {modal.cathegory && (
                <div className="relative my-2 animate-fade-in-down">
                  <input
                    type="text"
                    value={cathegoryValue}
                    placeholder="Enter Cathegory"
                    onChange={(e) => setCathegoryValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        !cathegory.includes(cathegoryValue)
                      ) {
                        setCathegory((pre) => [...pre, cathegoryValue]);
                      }
                    }}
                    className="inline-block w-full border-2 rounded input-css "
                  />

                  <span className="absolute top-0 right-0 flex items-center h-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 cursor-pointer "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => {
                        if (!cathegory.includes(cathegoryValue))
                          setCathegory((pre) => [...pre, cathegoryValue]);
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </div>
              )}
              <div
                className={`relative border-2 rounded-md bg-white flex-wrap px-2 pt-2 pb-0.5 animate-fade-in-down ${
                  cathegory.length ? "flex" : "hidden"
                }`}
              >
                {cathegory.map((item, index) => {
                  return (
                    <span className=" bg-gray-200 text-sm mr-1.5 py-1.5 mb-1 px-3 rounded-3xl font-medium  text-gray-500 select-none h-full flex items-center animate-fade-in-down">
                      {item}
                      <span
                        className="mx-px"
                        onClick={() =>
                          setCathegory((pre) => pre.filter((a) => a !== item))
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline-block w-5 h-5 text-center transition transform cursor-pointer hover:text-gray-800 hover:scale-110"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-gray-500 font-medium py-1.5">
                <p>Tag</p>
                <span className="mr-2 rounded-full ">
                  {modal?.tag ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() =>
                        setModal((pre) => {
                          return { ...pre, tag: !pre.tag };
                        })
                      }
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() =>
                        setModal((pre) => {
                          return { ...pre, tag: !pre.tag };
                        })
                      }
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {modal.tag && (
                <div className="relative my-2 animate-fade-in-down">
                  <input
                    type="text"
                    value={tagValue}
                    placeholder="Enter Tag"
                    onChange={(e) => setTagValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !tag.includes(tagValue)) {
                        setTag((pre) => [...pre, tagValue]);
                      }
                    }}
                    className="inline-block w-full border-2 rounded input-css "
                  />

                  <span className="absolute top-0 right-0 flex items-center h-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 cursor-pointer "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => {
                        if (!tag.includes(tagValue))
                          setTag((pre) => [...pre, tagValue]);
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </div>
              )}
              <div
                className={`relative border-2 rounded-md bg-white flex-wrap px-2 pt-2 pb-0.5 animate-fade-in-down ${
                  tag.length ? "flex" : "hidden"
                }`}
              >
                {tag.map((item, index) => {
                  return (
                    <span className=" bg-gray-200 text-sm mr-1.5 py-1.5 mb-1 px-3 rounded-3xl font-medium  text-gray-500 select-none h-full flex items-center animate-fade-in-down">
                      {item}
                      <span
                        className="mx-px"
                        onClick={() =>
                          setTag((pre) => pre.filter((a) => a !== item))
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline-block w-5 h-5 text-center transition transform cursor-pointer hover:text-gray-800 hover:scale-110"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
            <button onClick={submit} className="w-full my-4 save-button">
              Save
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CreatePost;
