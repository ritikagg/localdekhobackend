import Helper from "../../models/helperModel.js";
import HelperService from "../../models/helperServiceModel.js";
import serviceHistory from "../../models/serviceHistory.js";

const saveHelperConfig = async (req, res) => {
  if (req.method == "POST") {
    var postData = req.body.helper_data;
    if (typeof postData1 == "undefined") {
      var helper_id = postData.helper_id;
      var savedData = await Helper.getUserData(helper_id);
      if (savedData && savedData.length) {
        var saveData = await Helper.updateData(postData);
        if (saveData && saveData.insertId) {
          res.send({
            success: true,
            message: "Helper registered successfully",
          });
        }
      } else {
        res.send({ success: false, message: "Helper is not updated" });
      }
    }
  }
};

const fetchHelperServices = async (req, res) => {
  if (req.method == "POST") {
    var helper_id = req.body.helper_id;
    var allservices = [];
    var allrequests = [];
    if (typeof helper_id !== "undefined") {
      allservices = await HelperService.getHelperServices(helper_id);
      allrequests = await serviceHistory.getHelperData(helper_id);
    }
    res.send({
      success: true,
      allservices: allservices,
      allrequests: allrequests,
    });
  }
};

const addServiceDetails = async (req, res) => {
  if (req.method == "POST") {
    var formData = req.body.formData.formData;
    var name = req.body.name;
    var helper_id = formData.helper_id;

    if (typeof formData !== "undefined") {
      var returnData = await HelperService.saveData(formData);
      await HelperService.updateName(name, helper_id);
    }
    res.send({ success: true });
  }
};

const updateServiceDetails = async (req, res) => {
  if (req.method == "PUT") {
    var formData = req.body.updateData.formData;
    var service_id = Number(req.body.service_id);
    var helper_id = Number(req.body.helper_id);
    if (typeof formData !== "undefined") {
      var returnData = await HelperService.updateData(
        formData,
        " where service_id=" + service_id + " and helper_id=" + helper_id
      );
    }
    res.send({ success: true });
  }
};

const updateServiceStatus = async (req, res) => {
  if (req.method == "PUT") {
    var id = req.body.id;
    var action = req.body.action;
    if (id) {
      await serviceHistory.updateServiceStatusForAction(id, action);
    }
  }
  res.send({ success: true });
};

export default {
  saveHelperConfig,
  fetchHelperServices,
  addServiceDetails,
  updateServiceDetails,
  updateServiceStatus,
};
