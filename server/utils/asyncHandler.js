const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    next(err); // Pass the error to the error handler middleware
  }
};
module.exports = asyncHandler;