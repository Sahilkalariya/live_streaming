import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";
export const LiveStreams = () => {
  const [streams, setStreams] = useState([]);

  const CurrentLive = async () => {
    try {
      const data = await axios.get("liveStreams");
      console.log(data.data.streamers);
      setStreams(data.data.streamers);
    } catch (error) {
      console.log("error ");
      console.log(error);
    }
  };
  useEffect(() => {
    CurrentLive();
  }, []);
  return (
    <div className=" m-2 flex flex-wrap justify-around">
      {streams.length > 0 &&
        streams.map((stream) => {
          return <Card key={stream.streamer} stream={stream}></Card>;
        })}
    </div>
  );
};
