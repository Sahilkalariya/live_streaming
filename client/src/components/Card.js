import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export const Card = ({ stream }) => {
  const { streamInfo, setStreamInfo } = useContext(UserContext);
  const currentTime = new Date();
  var diff = currentTime - new Date(stream.started);
  diff = Math.floor(diff / 60000);
  console.log(stream);
  const navigate = useNavigate();
  const handelClick = () => {
    setStreamInfo({ ...stream, diff });
    navigate("/stream/" + stream.streamId);
  };
  return (
    <div
      onClick={() => {
        handelClick();
      }}
      className=" px-2 py-2 w-full lg:w-1/4 md:w-1/2 sm:w-full cursor-pointer"
    >
      <div className=" flex flex-col bg-white  p-3 rounded-md">
        <div className=" p-2 bg-slate-100 h-52 rounded-xl">Thumbnail</div>
        <div className=" mt-2 p-3 pt-2  bg-slate-100 h-20 rounded-md flex flex-col">
          <div className=" flex flex-raw gap-2 item-start">
            <div className=" flex flex-col justify-items-center">
              <div className=" p-0 flex w-10 h-10 bg-blue-400 rounded-full justify-around">
                <div className=" p-0 text-white text-4xl w-min h-min">
                  {stream.streamer[0]}
                </div>
              </div>
              <div className=" text-xl w-full text-center text-stone-500 ">
                {stream.streamer}
              </div>
            </div>
            <div className=" flex flex-col h-full">
              <div className=" flex item-start text-xl h-11">
                {stream.title ? stream.title : " Default Title"}
              </div>
              <div className="flex items-end text-stone-500 ">
                {diff <= 0 ? "Just Now" : diff + " minutes Ago"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
