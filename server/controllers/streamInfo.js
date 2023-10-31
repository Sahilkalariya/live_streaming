const mongoose = require("mongoose");
const multer = require("multer");
const StreamInfo = require("../model/StreamInfo");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Store uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.streamInfo = async (req, res) => {
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };

  try {
    upload.single("image")(req, res, async (err) => {
      const { title, streamKey } = req.body;
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "File upload failed" });
      }
      const imageName = req.file.filename;
      console.log(imageName);
      await StreamInfo.findOneAndUpdate(
        { streamKey },
        { streamKey, title, thumbnail: imageName },
        options
      );

      res.status(200).json({ message: "info updated successfully" });
    });
  } catch (error) {
    console.log("error while adding title");
    console.error(error);
    res.json({ message: "failure in title updation" });
  }
};
