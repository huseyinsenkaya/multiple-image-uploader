const UploadModel = require("../model/schema");
const fs = require("fs");

exports.home = async (req, res) => {
  const allImages = await UploadModel.find();
  res.render("main", { images: allImages });
};

exports.uploads = (req, res, next) => {
  const files = req.files;

  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }

  // convert images into base64 encoding
  let imgArray = files.map((file) => {
    let img = fs.readFileSync(file.path);

    return (encode_image = img.toString("base64"));
  });

  let result = imgArray.map((src, index) => {
    //create object to store data in the collection
    let finalImage = {
      fileName: files[index].originalname,
      contentType: files[index].mimetype,
      imageBase64: src,
    };

    let newUpload = new UploadModel(finalImage);

    return newUpload
      .save()
      .then(() => {
        return {
          msg: files[index].originalname + "Image uploaded successfully",
        };
      })
      .catch((err) => {
        if (err) {
          if (err.name === "MongoError" && err.code === 11000) {
            return Promise.reject({
              err: `Duplicate ${files[index].originalname}. File already exists`,
            });
          }
          return Promise.reject({
            err:
              err.message ||
              `Cannot upload ${files[index].originalname} Something missing.`,
          });
        }
      });
  });

  Promise.all(result)
    .then((msg) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.remove = (req, res) => {
  let deletedImage = req.body.removeImage;
  let fileName = req.body.removedFileName;

  const pathToFile = __dirname+"../../../uploads/images-" + fileName;

  //Delete from folder
  fs.unlink(pathToFile, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Successfully deleted the file.");
    }
  });

  //Delete from MongoDB
  UploadModel.findByIdAndDelete({ _id: deletedImage }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Succesfull deletion");
    }
  });

  setTimeout(() => {
    res.redirect("/");
  }, 100);
};
