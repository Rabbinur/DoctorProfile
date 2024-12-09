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

const getBlogById = async (req, res) => {
  const { id } = req.params; // Get the blog ID from the URL parameter

  try {
    const blog = await Blogs.findById(id); // Find a blog by its ID

    if (!blog) {
      return res.status(404).json({
        status: "error",
        message: "Blog not found",
      });
    }

    successResponse(res, {
      statusCode: 200,
      message: "Blog found successfully",
      payload: {
        blog,
      },
    });
  } catch (error) {
    // Handle errors like invalid ObjectId format
    return res.status(400).json({
      status: "error",
      message: "Invalid blog ID",
    });
  }
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


// Update blog function
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  // Fetch the current blog data
  const existingBlog = await Blogs.findById(id);
  if (!existingBlog) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Blog not found",
    });
  }

  console.log("Existing blog:", existingBlog);

  // Handle uploaded files
  if (req.files) {
    // Update or replace the URL
    if (req.files.url) {
      if (existingBlog.url) {
        // Delete the existing file if it exists
        await fileLib.delete(existingBlog.url);
      }
      // Add the new URL to the update data
      updateData.url = req.files.url[0]?.filename;
    }

    // Update or replace the favicon
    if (req.files.favicon) {
      if (existingBlog.favicon) {
        // Delete the existing file if it exists
        await fileLib.delete(existingBlog.favicon);
      }
      // Add the new favicon to the update data
      updateData.favicon = req.files.favicon[0]?.filename;
    }
  }

  // Merge social media data if provided
  if (req.body.social_media) {
    updateData.social_media = {
      ...existingBlog.social_media, // Existing social media data
      ...req.body.social_media,    // New social media data
    };
  }

  console.log("Update data:", updateData);

  // Update the blog document
  const updatedBlog = await Blogs.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true } // Return the updated document
  );

  if (!updatedBlog) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Blog not found",
    });
  }

  // Respond with success
  return successResponse(res, {
    statusCode: 200,
    message: "Blog successfully updated",
    payload: { updatedBlog },
  });
};



module.exports = {
  createBlog,
  getBlogById,
  getAllBlogs,
  deleteBlog,
  updateBlog,
};
