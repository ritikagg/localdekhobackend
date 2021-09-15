import loginController from "../controllers/helper/loginController.js";
import serviceController from "../controllers/service/serviceController.js";
import express from "express";
import helperConfigController from "../controllers/helper/helperConfigController.js";
const router = express.Router();

router.post("/verifyOtp", loginController.authUser);
router.post("/configHelper", helperConfigController.saveHelperConfig);
router.post("/fetchHelpersDetails", helperConfigController.fetchHelperServices);
router.put("/updateService", helperConfigController.updateServiceStatus);
router.post("/addNewService", helperConfigController.addServiceDetails);
router.put("/editService", helperConfigController.updateServiceDetails);

export default router;
