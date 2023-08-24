import React, { useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const LivestreamPlayer = () => {
  useEffect(() => {
    // Create a new video.js player instance
    const player = videojs("livestream-player", {
      autoplay: true,
      controls: true,
      fluid: true,
      sources: [
        {
          src: "http://localhost:8888/live/kD2HN5yJj/index.m3u8", // URL to your live stream
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
    <div data-vjs-player>
      <video id="livestream-player" className="video-js vjs-default-skin" />
    </div>
  );
};

export default LivestreamPlayer;
