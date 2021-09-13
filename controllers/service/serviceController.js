import Service from "../../models/serviceModel.js";
import serviceHistory from "../../models/serviceHistory.js";
import helperConfigController from "../helper/helperConfigController.js";
import Helper from "../../models/helperModel.js";

const getAll = async (req, res) => {
  var allServices = await Service.getServices();
  return { success: true, all_services: allServices };
};

const getServiceById = async (req, res) => {
  var allServices = [];
  var service_id = req.body.service_id;
  if (service_id) {
    allServices = await Service.getServiceDetail(service_id);
  }

  return { success: true, service_detail: allServices };
};

const getUserServices = async (req, res) => {
  var allServices = [];
  var user_id = req.body.user_id;
  if (user_id) {
    allServices = await serviceHistory.getUserData(user_id);
  }

  return { success: true, service_detail: allServices };
};

const gethelperServices = async (req, res) => {
  var allServices = [];
  var helper_id = req.body.helper_id;
  if (helper_id) {
    allServices = await serviceHistory.getHelperData(helper_id);
  }

  return { success: true, service_detail: allServices };
};

const getHelpersForServices = async (req, res) => {
  var availableHelpers = [];
  var helper_id = req.body.helper_id;
  if (helper_id) {
    allServices = await serviceHistory.getServiceHelperData(service_id);
  }

  return { success: true, all_helpers: availableHelpers };
};

const notifyHelper = async (req, res) => {};

const requestAction = async (req, res) => {};

export default {
  getAll,
  getServiceById,
  getUserServices,
  gethelperServices,
  getHelpersForServices,
  notifyHelper,
  requestAction,
};
