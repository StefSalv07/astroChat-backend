const statusModel = require("../model/statusModel");

// console.log("Debug - 2.1 status Controller Called)
exports.addStatus = async (req, res) => {
  const status = new statusModel(req.body);
  statusModel
    .findOne({ statusName: req.body.statusName })
    .then((data) => {
      if (data == undefined || data == null) {
        status.save().then((data) => {
          res.json({
            message: "Status Saved!",
            data: data,
            status: 200,
          });
          console.log("Status Added", data);
        });
      } else {
        res.json({
          message: "Status Already Exists!",
          status: 500,
        });
        console.log("Status exists", data);
      }
    })
    .catch((err) => {
      res.json({
        message: "Error Saving Status!",
        error: err,
        status: 500,
      });
      console.log("Error Saving Status", err);
    });
};

// console.log("Debug - 2.2 Add Status Called");
exports.getAllStatus = async (req, res) => {
  statusModel
    .find()
    .then((data) => {
      res.json({
        message: "All Status",
        data: data,
        status: 200,
      });
      console.log("All Status retrived", data);
    })
    .catch((err) => {
      res.json({
        message: "Error in getting Status",
        error: err,
        status: 500,
      });
      console.log("Error in getting Status", err);
    });
};

// console.log("Debug - 2.3 Get All Status Called");
exports.getStatusById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  statusModel
    .findById({ _id: id })
    .then((data) => {
      res.json({
        message: "Status By Id",
        data: data,
        status: 200,
      });
      console.log("Status By Id", data);
    })
    .catch((err) => {
      res.json({
        message: "Error in getting Status By Id",
        error: err,
        status: 500,
      });
      console.log("Error in getting Status By Id", err);
    });
};

// console.log("Debug - 2.4 Get Status By Id Called");
exports.updateStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.body;
  statusModel
    .findByIdAndUpdate({ _id: id }, status, { new: true })
    .then((data) => {
      res.json({
        message: "Status Updated",
        data: data,
        status: 200,
      });
      console.log("Status Updated", data);
    })
    .catch((err) => {
      res.json({
        message: "Error in Updating Status",
        error: err,
        status: 500,
      });
      console.log("Error in Updating Status", err);
    });
};

// console.log("Debug - 2.5 Update Status Called");

exports.deleteStatusById = async (req, res) => {
  const id = req.params.id;
  statusModel
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json({
        message: "Status Deleted",
        data: data,
        status: 200,
      });
      console.log("Status Deleted", data);
    })
    .catch((err) => {
      res.json({
        message: "Error in Deleting Status",
        error: err,
        status: 500,
      });
      console.log("Error in Deleting Status", err);
    });
};

// console.log("Debug - 2.6 Delete Status By Id Called");
// console.log("Debug - 3 -> Status Controller Called");
