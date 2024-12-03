const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const {
  createItem,
  getItems,

  updateItem,
  deleteItem,
  dashboard,
} = require("../controller/reveiw.controller");
const upload = require("../../middleware/multa.middleware");

const ReviewRouter = express.Router();

ReviewRouter.route("/all").get(asyncHandler(getItems));
ReviewRouter.route("/create").post(
  upload.fields([{ name: "url", maxCount: 1 }]),
  asyncHandler(createItem)
);
ReviewRouter.route("/:id").patch(
  upload.fields([{ name: "url", maxCount: 1 }]),
  asyncHandler(updateItem)
);
ReviewRouter.route("/:id").delete(asyncHandler(deleteItem));
ReviewRouter.route("/dash").get(asyncHandler(dashboard));

module.exports = ReviewRouter;
