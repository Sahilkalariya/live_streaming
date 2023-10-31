import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

export const Stream = () => {
  const { username: name, streamKey } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  function saveTitle(e) {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("streamKey", streamKey);
      formData.append("image", selectedFile);
      formData.append("title", title);
      const response = axios.post("/streamInfo", formData);
      if (response.status === 200) alert("Stream Info and thumbnail Saved");
    } catch (error) {
      alert(" some error occured please upload again");
    }
  }

  return (
    <div>
      <div className="bg-gray-100 h-screen flex flex-col p-6">
        <h1 className="text-3xl font-semibold mb-4">
          Live Streaming Instructions
        </h1>
        <p className="text-lg text-gray-700 mb-4 font-bold">
          To start streaming live, follow these steps:
        </p>
        <ol className=" text-gray-800 font-mono text-2xl">
          <li className="mb-2">
            <span className=" font-bold">Step 1</span>: Give Title and Thumbnail
            of your stream
            <form
              className=" mt-4"
              onSubmit={(e) => {
                saveTitle(e);
              }}
            >
              <div class="mb-4">
                <input
                  type="text"
                  id="title"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your Title Here"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  required
                ></input>
              </div>
              <div class="mb-4">
                <input
                  type="file"
                  id="image"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your Title Here"
                  onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                  }}
                  required
                ></input>
              </div>
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
            </form>
          </li>
          <li className="mb-2">
            <span className=" font-bold">Step 2</span>: open any Broadcasting
            software.
          </li>
          <li className="mb-2">
            <span className=" font-bold">Step 3</span>: Open setting of it and
            specify RTMP URL{" "}
            <span className=" text-gray-600z text-xl font-bold">
              rtmp://127.0.0.1:1935/live
            </span>
            .
          </li>
          <li className="mb-2">
            <span className=" font-bold">Step 4</span>: Set stream key to{" "}
            <span className=" text-gray-600 font-bold text-xl">
              {streamKey}
            </span>
            .
          </li>
          <li className="mb-2">
            <span className=" font-bold">Step 5</span>: Go live and engage with
            your audience.
          </li>
        </ol>
      </div>
    </div>
  );
};
