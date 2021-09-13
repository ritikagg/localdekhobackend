import User from "../../models/userModel.js";
import serviceHistory from "../../models/serviceHistory.js";
import crypto from "crypto";

const authUser = async (req, res) => {
  const smsKey = process.env.SMS_SECRET_KEY;
  const mobile = req.body.mobile;
  const hash = req.body.hash;
  const otp = req.body.otp;
  let [hashValue, expires] = hash.split(".");
  let now = Date.now();

  if (now > parseInt(expires)) {
    return res.status(504).send({ msg: `Timeout!! Please Try Again..` });
  }
  const data = `${mobile}.${otp}.${expires}`;
  const newCalculatedHash = crypto
    .createHmac("sha256", smsKey)
    .update(data)
    .digest("hex");

  if (newCalculatedHash === hashValue) {
    var savedata = {};
    savedata.contact_number = mobile;
    var previousData = await User.validateUserData(mobile);
    if (previousData && previousData.length) {
      var servicehistories = await serviceHistory.getUserData();
      var userData = previousData[0];
    } else {
      var savedData = await User.saveData(savedata);
      var servicehistories = "";
      var userData = { user_id: savedData.insertId };
    }
    return res.status(202).send({
      success: true,
      msg: "User verified",
      serviceHistory: servicehistories,
      userData: userData,
    });
  } else {
    console.log("Not Authenticated");
    return res.status(400).send({ verification: false, msg: `Incorrect OTP` });
  }
};

export default { authUser };
