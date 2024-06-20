const connectToDb = require("./config/db");
const express = require("express");
const app = express();
const env = require("dotenv");
const cors = require("cors");
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
const guestRoutes = require("./routes/guestRoutes");
const userRoutes = require("./routes/userRoutes");
const astrologerRoutes = require("./routes/astrologerRoutes");
const serviceRoutes = require("./routes/serviceTypeRoutes");
//using the routes
app.use("/roles", roleRoutes);
app.use("/statuses", statusRoutes);
app.use("/guests", guestRoutes);
app.use("/users", userRoutes);
app.use("/astrologers", astrologerRoutes);
app.use("/services", serviceRoutes);

app.listen(PORT, (err, success) => {
  if (err) {
    console.log("Error in Listening the PORT");
  } else {
    console.log("Server is Listening on PORT", PORT);
  }
});
connectToDb();
// console.log("Debug 1-> index called");
