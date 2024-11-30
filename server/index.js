const { connectToDb } = require("./config/db");

const dotenv = require("dotenv");
const app = require("./app");


//configuration
dotenv.config();
const PORT = process.env.PORT || 8000;

//Database Connection
connectToDb()
  .then(console.log(`Mongodb connection successful`))
  .catch((err) => console.log(`Mongodb connection failed`, err));



//APPLICATION LISTENING

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
