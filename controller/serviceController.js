const serviceTyeModel = require("../model/serviceTypeModel");

exports.addServiceType = async (req, res) => {
  const serviceType = new serviceTyeModel(req.body);
  console.log("body", serviceType);

  await serviceTyeModel
    .findOne({ serviceName: req.body.serviceName })
    .then((data) => {
      if (!data || data == undefined) {
        serviceType
          .save()
          .then((data) => {
            res.json({
              message: "Service Type Added Successfully",
              data: data,
              status: 200,
            });
          })
          .catch((err) => {
            res.json({
              message: "Service Type Addition Failed",
              data: err,
              status: 400,
            });
          });
      } else {
        res.json({
          message: "Service Type Already Added",
          data: data,
          status: 200,
        });

        console.log("data", data);
      }
    })
    .catch((err) => {
      res.json({
        message: "Service Type Addition Failed",
        data: err,
        status: 400,
      });
      console.log("error", err);
    });
};
exports.getAllServiceType = async (req, res) => {
  await serviceTyeModel
    .find()
    .then((data) => {
      res.json({
        message: "Service Type List",
        data: data,
        status: 200,
      });

      console.log("data", data);
    })
    .catch((err) => {
      res.json({
        message: "Service Type List Failed",
        data: err,
        status: 400,
      });
      console.log("error", err);
    });
};
exports.updateServiceTypeById = async (req, res) => {
  const id = req.params.id;
  console.log("update for id", id);

  const update = req.body;
  console.log("update", update);

  await serviceTyeModel
    .findByIdAndUpdate({ _id: id }, update, {
      new: true,
    })
    .then((data) => {
      res.json({
        message: "Service Type Updated Successfully",
        data: data,
        status: 200,
      });
      console.log("data", data);
    })
    .catch((err) => {
      res.json({
        message: "Service Type Updation Failed",
        data: err,
        status: 400,
      });

      console.log("error", err);
    });
};
exports.deleteServiceType = async (req, res) => {
  const id = req.params.id;
  console.log("update for id", id);
  await serviceTyeModel
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json({
        message: "Service Type Deleted Successfully",
        data: data,
        status: 200,
      });

      console.log("data", data);
    })
    .catch((err) => {
      res.json({
        message: "Service Type Deletion Failed",
        data: err,
        status: 400,
      });

      console.log("error", err);
    });
};
exports.getServiceTypeById = async (req, res) => {
  const id = req.params.id;
  console.log("update for id", id);
  await serviceTyeModel
    .findById({ _id: id })
    .then((data) => {
      res.json({
        message: "Service Type",
        data: data,
        status: 200,
      });

      console.log("data", data);
    })
    .catch((err) => {
      res.json({
        message: "Service Type Not Found",
        data: err,
        status: 400,
      });

      console.log("error", err);
    });
};
