const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  fileName: {
    type: String,
    unique: true,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  imageBase64: {
    type: String,
    required: true,
  },
});

module.exports = UploadModel = mongoose.model("uploads", uploadSchema);
