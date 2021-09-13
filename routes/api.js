import express from "express";
const router = express.Router();
import dotenv from "dotenv";
import crypto from "crypto";
import axios from "axios";
dotenv.config();
const smsKey = process.env.SMS_SECRET_KEY;

router.get("/sendOTP", (req, res) => {
  const mobile = req.query.mobile;
  const isDebugMobile = process.env.DEBUG_MOBILE.split(",").includes(
    mobile.toString()
  );
  const otp = isDebugMobile
    ? 123456
    : Math.floor(Math.random() * 899999 + 100000);
  const ttl = 100 * 60 * 1000;
  const expires = Date.now() + ttl;
  const data = `${mobile}.${otp}.${expires}`;
  const otpSMS = `Your LocalDekho verification OTP code is ${otp}. Code is valid for 10 minutes only, one time use. Please DO NOT share this OTP with anyone.`;
  const hash = crypto.createHmac("sha256", smsKey).update(data).digest("hex");
  const fullHash = `${hash}.${expires}`;

  //if (!isDebugMobile) {
  if (false) {
    try {
      const apiKEY = process.env.FAST2SMS_API_KEY;

      const uri = `https://www.fast2sms.com/dev/bulkV2`;

      axios.get(
        uri,
        {
          params: {
            authorization: apiKEY,
            route: "q",
            message: otpSMS,
            language: "english",
            flash: 0,
            numbers: mobile,
            sender_id: "FSTSMS",
          },
        },
        {
          "cache-control": "no-cache",
        }
      );
    } catch (error) {
      if (error.data.status_code === 412)
        console.log(
          chalk.red("Can't send message. Authorization key missing or invalid.")
        );

      if (error.data.status_code === 402)
        console.log(chalk.red("Can't send message. Message text is required."));

      if (error.data.status_code === 405)
        console.log(
          chalk.red("Can't send message.Atleast one Number is required.")
        );
    }
  }

  res.status(200).send({ mobile, hash: fullHash, otp });
});

router.post("/api/getAddressLine", async (req, res) => {
  const lat = req.body.lat;
  const lng = req.body.lng;
  const uri = `https://www.swiggy.com/dapi/misc/reverse-geocode`;
  try {
    const response = await axios.get(uri, {
      params: {
        latlng: lat + `,` + lng,
      },
    });

    const data = response.data.data[0].address_components;

    const sublocality_level_1 = data.filter((item) => {
      if (item.types.includes("sublocality_level_1")) {
        return item;
      }
    });

    const administrative_area_level_2 = data.filter((item) => {
      if (item.types.includes("administrative_area_level_2")) {
        return item;
      }
    });

    console.log(administrative_area_level_2);
    const postal_code = data.filter((item) => {
      if (item.types.includes("postal_code")) {
        return item;
      }
    });

    const addressLine =
      sublocality_level_1[0].short_name +
      `, ` +
      administrative_area_level_2[0].short_name;

    res.status(200).send({
      addressLine: addressLine,
      postal_code: postal_code[0].short_name,
    });
  } catch (e) {
    console.log(e);
  }
});

export default router;
