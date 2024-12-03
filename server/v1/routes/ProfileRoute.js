const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const { getAllBlogs } = require("../controller/blog.controller");
const {
  createProfile,
  updateProfileById,
  deleteProfileById,
  getProfile,
} = require("../controller/profile.controller");
const upload = require("../../middleware/multa.middleware");

const ProfileRouter = express.Router();

ProfileRouter.route("/all").get(asyncHandler(getProfile));

ProfileRouter.route("/create").post(
  upload.fields([{ name: "url", maxCount: 1 }]),
  asyncHandler(createProfile)
);

ProfileRouter.route("/update/:id").patch(
  upload.fields([{ name: "url", maxCount: 1 }]),
  asyncHandler(updateProfileById)
);

ProfileRouter.route("/delete/:id").delete(asyncHandler(deleteProfileById));

module.exports = ProfileRouter;
