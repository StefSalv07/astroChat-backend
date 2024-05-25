const roleModel = require("../model/roleModel");

exports.addRole = (req, res) => {
  const role = new roleModel(req.body);

  roleModel
    .findOne({ roleName: req.body.roleName })
    .then((data) => {
      if (data == undefined || data == null) {
        role.save().then((data) => {
          res.json({
            message: "Role Saved!",
            data: data,
            status: 200,
          });
        });
      } else {
        res.json({
          message: "Role Already Exists!",
          status: 500,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error Saving Role!",
        error: err,
        status: 500,
      });
    });
};
// add roles done

exports.getAllRoles = (req, res) => {
  roleModel
    .find()
    .then((data) => {
      res.json({
        message: "All Roles",
        data: data,
        status: 200,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error in getting Roles",
        error: err,
        status: 500,
      });
    });
};

// get all roles Done
// console.log("roleController");
exports.getRoleById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  roleModel
    .findById({ _id: id })
    .then((data) => {
      if (!data) {
        return res.json({
          message: "Role Not Found",
          status: 404,
        });
      } else {
        return res.json({
          message: "Role Found",
          data: data,
          status: 200,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error in getting Role",
        error: err,
        status: 500,
      });
    });
};
exports.deleteRoleById = (req, res) => {
  const id = req.body.id;

  roleModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          message: "Role Not Found",
        });
      }
      res.status(200).json({
        message: "Role Deleted",
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      console.log(err); // Log the error for debugging purposes
      res.status(500).json({
        message: "Error Deleting Role",
        error: err,
      });
    });
};

exports.updateRole = (req, res) => {
  const id = req.params.id;

  roleModel
    .findByIdAndUpdate({ _id: id }, req.body)
    .then((data) => {
      if (!data) {
        res.json({
          message: "Role Not Found",
          status: 404,
        });
      } else {
        res.json({
          message: "Role Updated",
          data: data,
          status: 200,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error in updating Role",
        error: err,
        status: 500,
      });
    });
};
