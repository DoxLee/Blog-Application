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
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cathegory, setCathegory] = useState([]);
  const [tag, setTag] = useState([]);

  const [time, setTime] = useState(moment().format("HH-mm"));
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const [publishAt, setPublishAt] = useState(
    new Date(`${moment().format("YYYY-MM-DD HH:mm")}`).getTime()
  );

  useEffect(() => {
    setPublishAt(() =>
      new Date(`${moment().format(`${date} ${time}`)}`).getTime()
    );
    console.log(publishAt);
  }, [time, date]);

  console.log(publishAt, "default value of publish AT");

  const [modal, setModal] = useState({ cathegory: true, tag: true });
  const [cathegoryValue, setCathegoryValue] = useState(undefined);
  const [tagValue, setTagValue] = useState(undefined);
  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      image,
      title,
      description,
      publishAt,
      content,
    };
    try {
      const blogPostRes = await Axios.post(
        "http://localhost:3000/blog/create-blog-post",
        payload,
        {
          headers: {
            "acces-token": user.accesToken,
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
    <div className="mt-4 mx-10 tracking-wide text-gray-600">
      <div className="w-4/5 inline-block align-top">
        <div className="mb-2 align-top">
          <div className="inline-block w-3/5 lg:w-1/4 align-top py-2 px-4">
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
                <div className="rounded-md relative">
                  {imageList.length ? (
                    <div>
                      <img
                        src={imageList[0]["data_url"]}
                        alt="cover"
                        className="w-full h-32 sm:h-48 object-cover rounded inline-block"
                      />
                      <span
                        onClick={() => onImageRemove(0)}
                        className="absolute top-0 left-0 py-2 px-2  bg-white bg-opacity-50 rounded-full my-2 mx-2 hover:text-red-600 hover:bg-gray-200 transition duration-150 ease-in"
                      >
                        {svg.trash}
                      </span>
                    </div>
                  ) : (
                    <div
                      {...dragProps}
                      onClick={onImageUpload}
                      className="shadow-inner border-2 border-dashed cursor-pointer border-gray-600 rounded-md h-64 w-full text-center input-button text-xl flex items-center justify-center"
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
          <div className="inline-block w-2/5 lg:w-3/4 align-top">
            <div>
              <div name="title-input">
                <label htmlFor="title" className="label-css text-gray-600 ">
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

        <button onClick={submit} className="input-button-css my-4 float-right">
          Save
        </button>
      </div>
      <div className="w-1/5 inline-block align-top px-3">
        <div>
          <div className="text-gray-500 font-medium py-1.5">Author</div>
          <div className="flex py-2 px-2 bg-white rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
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
              {user.user.userName}
            </div>
          </div>
        </div>
        <div className="py-2">
          <div className="text-gray-500 font-medium py-1.5">Post Date</div>
          <div className="grid grid-cols-5 gap-2">
            <input
              type="date"
              className="date-css text-gray-600 col-span-3 outline-none"
              defaultValue={date}
              onChange={(e) => setDate(() => e.target.value)}
            />
            <input
              type="time"
              defaultValue={time}
              onChange={(e) => setTime(() => e.target.value)}
              className="date-css col-span-2 outline-none"
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
                  className="h-6 w-6 cursor-pointer"
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
                  className="h-5 w-5 cursor-pointer"
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
                className="input-css rounded inline-block border-2 w-full "
              />

              <span className="absolute right-0 top-0 h-full flex items-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 cursor-pointer "
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
                      className="h-5 w-5 inline-block text-center cursor-pointer hover:text-gray-800 transform hover:scale-110 transition"
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
                  className="h-6 w-6 cursor-pointer"
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
                  className="h-5 w-5 cursor-pointer"
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
                value={cathegoryValue}
                placeholder="Enter Tag"
                onChange={(e) => setTagValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !tag.includes(tagValue)) {
                    setTag((pre) => [...pre, tagValue]);
                  }
                }}
                className="input-css rounded inline-block border-2 w-full "
              />

              <span className="absolute right-0 top-0 h-full flex items-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 cursor-pointer "
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
                      className="h-5 w-5 inline-block text-center cursor-pointer hover:text-gray-800 transform hover:scale-110 transition"
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
      </div>
    </div>
  );
};

export default CreatePost;
