const {
  successResponse,
  errorResponse,
} = require("../../helper/responseHandler");
const { Review } = require("../../model/review.model");
const fileLib = require("../../helper/staticFile");
const { Appointment } = require("../../model/appointment.model");
const { Blogs } = require("../../model/blog.model");
const { Chamber } = require("../../model/chamber.model");
// Create a new item
const createItem = async (req, res) => {
  const { name, desc, rating } = req.body;
  const urlPath = req.files?.url?.[0]?.path || "";
  const newItem = new Review({ name, url: urlPath, desc, rating });
  await newItem.save();
  successResponse(res, {
    statusCode: 201,
    message: "Item created successfully",
    payload: {
      item: newItem,
    },
  });
};

// Get all items
const getItems = async (req, res) => {
  const items = await Review.find();
  successResponse(res, {
    message: "Review fetched successfully",
    payload: {
      data: items,
    },
  });
};

// Update an item by ID
const updateItem = async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  console.log(updates);
  const urlPath = req.files?.url?.[0]?.path || "";

  // Find the item to update by ID
  const itemToUpdate = await Review.findById(id);
  if (!itemToUpdate) {
    return errorResponse(res, { statusCode: 404, message: "Item not found" });
  }

  if (req.files && req.files.url) {
    if (itemToUpdate.url) {
      await fileLib.delete(itemToUpdate.url);
    }
    updates.url = urlPath;
  }

  // Use only the fields provided in `updates` to update the item
  const item = await Review.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true }
  );

  if (!item) {
    return errorResponse(res, { statusCode: 404, message: "Item not found" });
  }

  // Send a success response with the updated item
  successResponse(res, {
    statusCode: 200,
    message: "Item updated successfully",
    payload: {
      item,
    },
  });
};

// Delete an item by ID
const deleteItem = async (req, res) => {
  const { id } = req.params;

  const item = await Review.findByIdAndDelete(id);
  if (!item) {
    return errorResponse(res, { statusCode: 404, message: "Review not found" });
  }
  if (item.url) {
    await fileLib.delete(item.url);
  }
  successResponse(res, {
    statusCode: 200,
    message: "Item deleted successfully",
  });
};

const dashboard = async (req, res) => {
  // Use Promise.all to run multiple aggregation queries concurrently
  const [totalReviews, totalAppointments, totalBlogs, totalChambers] =
    await Promise.all([
      Review.aggregate([
        {
          $group: {
            _id: null,
            totalReviews: { $sum: 1 }, // Count total reviews
          },
        },
      ]),
      Appointment.aggregate([
        {
          $group: {
            _id: null,
            totalAppointments: { $sum: 1 }, // Count total appointments
          },
        },
      ]),
      Blogs.aggregate([
        {
          $group: {
            _id: null,
            totalBlogs: { $sum: 1 }, // Count total blogs
          },
        },
      ]),
      Chamber.aggregate([
        {
          $group: {
            _id: null,
            totalChambers: { $sum: 1 }, // Count total chambers
          },
        },
      ]),
    ]);

  // Extract the total count from the results or default to 0 if empty
  const totalReviewsCount =
    totalReviews.length > 0 ? totalReviews[0].totalReviews : 0;
  const totalAppointmentsCount =
    totalAppointments.length > 0 ? totalAppointments[0].totalAppointments : 0;
  const totalBlogsCount = totalBlogs.length > 0 ? totalBlogs[0].totalBlogs : 0;
  const totalChambersCount =
    totalChambers.length > 0 ? totalChambers[0].totalChambers : 0;

  // Send the response with the calculated totals
  res.status(200).json({
    status: "success",
    data: {
      totalReviews: totalReviewsCount,
      totalAppointments: totalAppointmentsCount,
      totalBlogs: totalBlogsCount,
      totalChambers: totalChambersCount,
    },
  });
};

module.exports = {
  createItem,
  getItems,
  dashboard,
  updateItem,
  deleteItem,
};
