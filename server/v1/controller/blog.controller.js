const {
  successResponse,
  errorResponse,
} = require("../../helper/responseHandler");
const { Blogs } = require("../../model/blog.model");
const fileLib = require("../../helper/staticFile");
const createBlog = async (req, res) => {
  const faviconPath = req.files?.favicon?.[0]?.filename || "";
  const urlPath = req.files?.url?.[0]?.filename || "";
  console.log({ faviconPath, urlPath });
  console.log(req.body);

  // Create a new blog document
  const newBlog = new Blogs({
    ...req.body,
    url: urlPath,
    favicon: faviconPath,
  });
  // Save to the database
  const savedBlog = await newBlog.save();
  successResponse(res, {
    statusCode: 201,
    message: `Successfully created ${req.body.type}`,
    payload: {
      savedBlog,
    },
  });
};

const getAllBlogs = async (req, res) => {
  const { type, page = 1, limit = 10 } = req.query;

  const filter = type ? { type } : {};

  const totalBlogs = await Blogs.countDocuments(filter);
  const blogs = await Blogs.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  successResponse(res, {
    statusCode: 200,
    message: `${
      type ? `${type} found successfully` : `Data found successfully`
    }`,
    payload: {
      blogs,
      pagination: {
        total: totalBlogs,
        page: Number(page),
        limit: Number(limit),
      },
    },
  });
};


const deleteBlog = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const deletedBlog = await Blogs.findByIdAndDelete(id);
  console.log(deletedBlog);
  if (!deletedBlog) {
    return errorResponse(res, {
      statusCode: 404,
      message: `${deletedBlog.type} not found`,
    });
  }

  // Delete the files if they exist
  if (deletedBlog.url) {
    await fileLib.delete(deletedBlog.url);
  }
  if (deletedBlog.favicon) {
    await fileLib.delete(deletedBlog.favicon);
  }

  successResponse(res, {
    statusCode: 200,
    message: "Blog successfully deleted",
  });
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  // Check for uploaded files and set them in the update data if they exist
  if (req.files) {
    if (req.files.url) {
      updateData.url = req.files.url[0]?.filename || updateData.url;
    }
    if (req.files.favicon) {
      updateData.favicon = req.files.favicon[0]?.filename || updateData.favicon;
    }
  }

  // If social media updates are provided, merge them with the existing social media object
  if (req.body.social_media) {
    updateData.social_media = {
      ...updateData.social_media, // Existing social media data
      ...req.body.social_media, // New social media data from the request
    };
  }
  const deletedBlog = await Blogs.findById(id);
  console.log(deletedBlog);
  if (deletedBlog.url) {
    await fileLib.delete(deletedBlog.url);
  }
  if (deletedBlog.favicon) {
    await fileLib.delete(deletedBlog.favicon);
  }

  // Find and update the blog by ID
  const updatedBlog = await Blogs.findByIdAndUpdate(
    id,
    { $set: updateData },
    {
      new: true,
    }
  );

  if (!updatedBlog) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Blog not found",
    });
  }

  successResponse(res, {
    statusCode: 200,
    message: "Blog successfully updated",
    payload: { updatedBlog },
  });
};

module.exports = { createBlog, getAllBlogs, deleteBlog, updateBlog };
