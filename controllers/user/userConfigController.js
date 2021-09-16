import User from "../../models/userModel.js";
import serviceHistory from "../../models/serviceHistory.js";
import helperServiceModel from "../../models/helperServiceModel.js";

const fetchUserServices = async (req, res) => {
  if (req.method == "POST") {
    var user_id = req.body.user_id;
    var allrequests = [];
    if (typeof user_id !== "undefined") {
      allrequests = await serviceHistory.getUserData(user_id);
    }
    res.send({
      success: true,
      allrequests: allrequests,
    });
  }
};

const createRequest = async (req, res) => {
  if (req.method == "POST") {
    var user_id = req.body.user_id;
    var service_id = req.body.service_id;
    var user_name = req.body.user_name;
    var location = req.body.location;
    var pin_code = req.body.pin_code;

    if (
      typeof user_id !== "undefined" &&
      typeof service_id !== "undefined" &&
      typeof user_name !== "undefined" &&
      typeof location !== "undefined" &&
      typeof pin_code !== "undefined"
    ) {
      await User.updateUserDetails({
        user_id: user_id,
        user_name: user_name,
        location: location,
        pin_code: pin_code,
      });

      var allHelperByServiceId =
        await helperServiceModel.fetchHelperByServiceId(service_id);

      allHelperByServiceId.map((item) => {
        var helper_id = item.helper_id;
        return User.createRequestService({
          user_id: user_id,
          service_id: service_id,
          helper_id: helper_id,
        });
      });
    }
    res.send({
      success: true,
      // allrequests: allrequests,
    });
  }
};

const saveHelperConfig = async (req, res) => {
  if (req.method == "POST") {
    var postData = req.body.helper_data;
    if (typeof postData1 == "undefined") {
      var user_id = postData.user_id;
      var savedData = await User.getUserData(user_id);
      if (savedData && savedData.length) {
        var saveData = await User.updateData(postData);
        if (saveData && saveData.insertId) {
          res.send({ success: true, message: "User registered successfully" });
        }
      } else {
        res.send({ success: false, message: "User is not updated" });
      }
    }
  }
};

const getAll = async (req, res) => {
  var all = await User.getAllUsers();
  console.log(all);
  res.send({ success: true, all_users: all });
};

const updateServiceStatus = async (req, res) => {
  if (req.method == "PUT") {
    var id = req.body.id;
    var action = req.body.action;
    var service_id = req.body.service_id;
    var user_id = req.body.user_id;

    if (id) {
      await serviceHistory.updateServiceStatusForAction(id, action);
    }

    if ((id, service_id && user_id && action === "scheduled")) {
      await serviceHistory.updateServiceStatusForAccept(
        id,
        service_id,
        user_id,
        "helper_declined"
      );
    }
  }
  res.send({ success: true });
};

export default {
  getAll,
  saveHelperConfig,
  fetchUserServices,
  createRequest,
  updateServiceStatus,
};
