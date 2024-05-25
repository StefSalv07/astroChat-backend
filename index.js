const connectToDb = require("./config/db");
const express = require("express");
const app = express();
const env = require("dotenv");
// making The App Listen
const PORT = process.env.PORT || 6000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
env.config();

// defining routes
//routes
// console.log("Debug 2-> index called");
const roleRoutes = require("./routes/roleRoutes");
const statusRoutes = require("./routes/statusRoutes");
//using the routes
app.use("/roles", roleRoutes);
app.use("/statuses", statusRoutes);

app.listen(PORT, (err, success) => {
  if (err) {
    console.log("Error in Listening the PORT");
  } else {
    console.log("Server is Listening on PORT", PORT);
  }
});
connectToDb();
// console.log("Debug 1-> index called");
