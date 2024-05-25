const connectToDb = require("./config/db");
const express = require("express");
const app = express();
const env = require("dotenv");
// making The App Listen
const PORT = process.env.PORT || 6000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
env.config();
connectToDb();
// defining routes
const guestRoutes = require("./routes/guestRoutes");
const roleRoutes = require("./routes/roleRoutes");
//using the routes
app.use("/roles", roleRoutes);
app.use("/guests", guestRoutes);

app.listen(PORT, (err, success) => {
  if (err) {
    console.log("Error in Listening the PORT");
  } else {
    console.log("Server is Listening on PORT", PORT);
  }
});
