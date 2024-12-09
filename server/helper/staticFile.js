

// const fs = require("fs").promises;
// const path = require("path");

// const lib = {};
// lib.storePath = path.join(__dirname, "/../uploads");
// lib.delete = async (file) => {
//   // unlink file

//   // if (!file) {
//   //   return;
//   // }
//   if (!file) return;
//   await fs.unlink(`${lib.storePath}/${file}`);
// };

// module.exports = lib;



const fs = require("fs").promises;
const path = require("path");

const lib = {};
lib.storePath = path.join(__dirname, "/../uploads");

// Function to safely delete a file if it exists
lib.delete = async (file) => {
  if (!file) return; // Skip if no file name is provided
  const filePath = path.join(lib.storePath, file);
  try {
    await fs.unlink(filePath); // Attempt to delete the file
    console.log(`Deleted file: ${file}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      // File does not exist, log and skip
      console.log(`File not found, skipping: ${file}`);
    } else {
      // Handle other errors
      console.error(`Error deleting file: ${file}`, error);
      throw error;
    }
  }
};

module.exports = lib;
