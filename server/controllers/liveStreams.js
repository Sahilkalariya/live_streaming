const axios = require("axios");
require("dotenv").config();
const User = require("../model/user");
const StreamInfo = require("../model/StreamInfo");

exports.liveStreams = async (req, res) => {
  const streamers = await exctractData();
  res.json({
    streamers,
  });
};
const exctractData = async () => {
  const { data } = await axios.get(process.env.NMS_SERVER_HTTP + "api/streams");
  const currentLive = [];

  if (data && data.live && Object.keys(data.live).length > 0) {
    await Promise.all(
      Object.keys(data.live).map(async (streamer) => {
        const user = await User.findOne({ stream_key: streamer });
        const info = await StreamInfo.findOne({ streamKey: streamer });
        if (user) {
          currentLive.push({
            streamId: streamer,
            streamer: user.username,
            started: data.live[streamer].publisher.connectCreated,
            title: info?.title,
            thumbnail: info?.thumbnail,
          });
        }
      })
    );
  }
  return currentLive;
};
