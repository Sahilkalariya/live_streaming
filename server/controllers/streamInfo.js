const mongoose = require("mongoose");

const StreamInfo = require("../model/StreamInfo");

exports.streamInfo = async (req, res) => {
  const { title, streamKey } = req.body;
  console.log("title stream key ", streamKey, " ", title);

  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };

  try {
    await StreamInfo.findOneAndUpdate(
      { streamKey },
      { streamKey, title },
      options
    );
    res.status(201).json({ message: "title added successfully" });
  } catch (error) {
    console.log("error while adding title");
    console.error(error);
    res.json({ message: "failure in title updation" });
  }
};
