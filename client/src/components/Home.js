import React from "react";
import LivestreamPlayer from "./LivestreamPlayer";
import { LiveStreams } from "./LiveStreams";
import { Card } from "./Card";
export const Home = () => {
  return (
    <div className=" h-screen bg-slate-50">
      <LiveStreams></LiveStreams>
    </div>
  );
};
