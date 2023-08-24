const User = require("../model/user");
const NodeMediaServer = require("node-media-server"),
  config = require("../config/nmsConfig").rtmp_server;

nms = new NodeMediaServer(config);

nms.on("prePublish", async (id, StreamPath, args) => {
  let stream_key = getStreamKeyFromStreamPath(StreamPath);
  console.log(
    "[NodeEvent on prePublish]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
  const user = await User.findOne({ stream_key: stream_key });
  if (!user) {
    let session = nms.getSession(id);
    session.reject();
  } else {
    console.log("accepting");
  }
});

const getStreamKeyFromStreamPath = (path) => {
  let parts = path.split("/");
  return parts[parts.length - 1];
};

module.exports = nms;
