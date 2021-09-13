import loginController from "../controllers/user/loginController.js";
import userConfigController from "../controllers/user/userConfigController.js";
import express from "express";
const router = express.Router();

/*router.route('/')
.get(protect, checkUserlogin, getUsers)*/
router.post("/verifyOtp", loginController.authUser);
router.post("/fetchUsersDetails", userConfigController.fetchUserServices);
router.post("/requestService", userConfigController.createRequest);
router.put("/updateService", userConfigController.updateServiceStatus);
router.get("/allUsers", loginController.authUser);
/*router
  .route('/profile')
  .put(protect, checkUserlogin,loginController.updateUserProfile)
router
  .route('/dashboard')
  //.delete(protect, admin, deleteUser)
  .get(protect, checkUserlogin, loginController.getUserById)
 // .put(protect, admin, updateUser)

export default router*/

//router.post('login',loginController.userLogin)
export default router;
