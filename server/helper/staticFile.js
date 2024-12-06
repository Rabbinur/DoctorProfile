

const fs = require("fs").promises;
const path = require("path");

const lib = {};
lib.storePath = path.join(__dirname, "/../uploads");
lib.delete = async (file) => {
  // unlink file

  if (!file) {
    return;
  }
  await fs.unlink(`${lib.storePath}/${file}`);
};

module.exports = lib;