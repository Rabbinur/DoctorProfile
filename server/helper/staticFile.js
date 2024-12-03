const fs = require("fs").promises;
const path = require("path");

const lib = {};
lib.storePath = path.join(__dirname, "/../uploads");

lib.delete = async (file) => {
  try {
    if (!file) {
      console.log("No file path provided for deletion.");
      return;
    }

    // Check if the file path is absolute or relative
    const filePath = path.isAbsolute(file) ? file : path.join(lib.storePath, file);

    console.log("Deleting file at path:", filePath);

    // Delete the file
    await fs.unlink(filePath);
    console.log("File deleted successfully.");
  } catch (error) {
    console.error("Error deleting file:", error.message);
  }
};

module.exports = lib;
