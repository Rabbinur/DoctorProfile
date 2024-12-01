const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");


const { getAllBlogs, createBlog, updateBlog, deleteBlog } = require("../controller/blog.controller");
const upload = require("../../middleware/multa.middleware");

const BlogRouter = express.Router();
BlogRouter.route("/all").get(asyncHandler(getAllBlogs))  ///?type=blog
BlogRouter.route("/update/:id").patch(asyncHandler(updateBlog))
BlogRouter.route("/del/:id").delete(asyncHandler(deleteBlog))
BlogRouter.route("/create").post(
    upload.fields([
      { name: "url", maxCount: 1 },
      { name: "favicon", maxCount: 1 },
    ]),
    asyncHandler(createBlog)
  );



module.exports ={BlogRouter}


