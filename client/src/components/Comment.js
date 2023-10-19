import React, { useState, useContext, useEffect, useRef } from "react";
import { lodash, uniqBy } from "lodash";
import io from "socket.io-client";
import { UserContext } from "../UserContext";

export const Comment = ({ streamKey }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [socket, setSocket] = useState();
  const { username: name } = useContext(UserContext);
  const divUnderMsg = useRef();
  useEffect(() => {
    const div = divUnderMsg.current;
    if (div) div.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  useEffect(() => {
    // setSocket(socket);
    const socket = io(process.env.REACT_APP_BACKEND_URL);
    setSocket(socket);
    // Add socket.io event listeners and emit events here
    socket.on("connect", () => {
      console.log("Connected to live chat server");
    });
    socket.on("comment", (msg) => {
      setComments((prevComments) => [...prevComments, msg]);
    });
    socket.emit("join", streamKey);

    // Don't forget to clean up the socket on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  function sendComment(e) {
    e.preventDefault();
    socket.emit("comment", { room: streamKey, comment: comment, user: name });
    setComment("");
  }

  return (
    <div className=" max-h-full min-h-full p-2">
      <div className=" h-96 overflow-y-auto w-full">
        {comments.map((chat, index) => (
          <div className="text-left" key={index}>
            <div
              className={
                "p-2 my-2 inline-block rounded-sm text-sm bg-white text-black "
              }
            >
              <div className="">
                <span className=" text-red-600 font-bold">{chat.user} </span> :{" "}
                <span> {chat.comment}</span>
              </div>{" "}
            </div>
          </div>
        ))}
        <div ref={divUnderMsg}></div>
      </div>
      {!!name && (
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            sendComment(e);
          }}
        >
          <input
            value={comment}
            onChange={(ev) => setComment(ev.target.value)}
            type="text"
            placeholder="Type Your Message "
            className="flex-grow p-2 bg-white border rounded-md"
          />
          {/* <label
            type="button"
            className="p-2 text-black bg-gray-200 border border-gray-200 rounded-sm cursor-pointer"
          >
          </label> */}
          <div className=" min-w-fit">
            <button
              type="submit"
              className="p-2 text-white bg-blue-500 rounded-lg min-w-fit pl-4 pr-4"
            >
              Chat
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
