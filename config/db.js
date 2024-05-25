const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// Connecting to data base
// const connection = mongoose
//   .connect("mongodb://localhost:27017/astrodb")
//   .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));

const connectToDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      //   useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB...");
  } catch (err) {
    console.error("Could not connect to MongoDB...", err);
  }
};
module.exports = connectToDb;
