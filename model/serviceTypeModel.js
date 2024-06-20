const mongoose = require("mongoose");
const schema = mongoose.Schema;
const serviceTypeSchema = new schema(
  {
    serviceName: {
      type: String,
      required: true,
    },
    serviceDesc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("serviceType", serviceTypeSchema);
