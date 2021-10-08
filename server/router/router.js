const route = require("express").Router();
const controller = require("../controller/controller");
const store = require("../middleware/multer")

//routes
route.get("/", controller.home);

route.post("/uploadMultiple",store.array('images',12), controller.uploads);

route.post("/removeImage",controller.remove);

module.exports = route;
