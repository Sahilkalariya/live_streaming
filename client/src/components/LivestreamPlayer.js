import React, { useEffect, useContext } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Comment } from "./Comment";
import { UserContext } from "../UserContext";

const LivestreamPlayer = ({}) => {
  const { streamKey } = useParams();
  const { streamInfo, setStreamInfo } = useContext(UserContext);

  const getStreamInfo = async () => {
    try {
      const data = await axios.get("liveStreams");

      const stream = data.data.streamers.find(
        (ele) => ele.streamId === streamKey
      );

      const currentTime = new Date();
      var diff = currentTime - new Date(stream.started);
      diff = Math.floor(diff / 60000);

      setStreamInfo({ ...stream, diff });
    } catch (error) {
      console.log("error ");
      console.log(error);
    }
  };
  useEffect(() => {
    getStreamInfo();
  }, []);

  useEffect(() => {
    // Create a new video.js player instance
    const player = videojs("livestream-player", {
      autoplay: true,
      controls: true,
      fluid: true,
      responsive: true,
      liveui: true,
      sources: [
        {
          src:
            process.env.REACT_APP_NMS_SERVER +
            "live/" +
            streamKey +
            "/index.m3u8", // URL to your live stream

          type: "application/x-mpegURL", // HLS stream type
        },
      ],
    });
    // Cleanup when the component unmounts
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, []);

  return (
    <div className="flex w-full flex-wrap p-3">
      <div className="w-full lg:w-2/3 sm:w-full">
        <div data-vjs-player>
          <video id="livestream-player" className="video-js vjs-default-skin" />
        </div>
        <div className=" mt-2 p-3 pt-2  bg-slate-100 h-20 rounded-md flex flex-col">
          <div className=" flex flex-raw gap-2 item-start">
            <div className=" flex flex-col justify-items-center">
              <div className=" p-0 flex w-10 h-10 bg-blue-400 rounded-full justify-around">
                <div className=" p-0 text-white text-4xl w-min h-min">
                  {streamInfo?.streamer[0]}
                </div>
              </div>
              <div className=" text-xl w-full text-center text-stone-500 ">
                {streamInfo?.streamer}
              </div>
            </div>
            <div className=" flex flex-col h-full">
              <div className=" flex item-start text-xl h-11">
                {streamInfo?.title ? streamInfo.title : " Default Title"}
              </div>
              <div className="flex items-end text-stone-500 ">
                {streamInfo?.diff <= 0
                  ? "Just Now"
                  : streamInfo?.diff + " minutes Ago"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="  w-full lg:w-1/3 rounded-md h-full sm:pl-0 lg:pl-4">
        <div className=" border h-10 flex items-center justify-center">
          <h1 className=" font-bold ">STREAM CHAT</h1>
        </div>
        <div className=" bg-gray-100">
          <Comment streamKey={streamKey} />
        </div>
      </div>
    </div>
  );
};

export default LivestreamPlayer;
