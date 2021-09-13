import User from '../../models/helperModel.js' 
import serviceHistory from '../../models/serviceHistory.js' 
import crypto from "crypto";
import dotenv from 'dotenv'
dotenv.config()

const authUser = (async(req, res)=> {
	try{
		const mobile = req.body.mobile;
		const hash = req.body.hash;
		const otp = req.body.otp;
		const smsKey = process.env.SMS_SECRET_KEY;
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
			var savedata ={}
			savedata.contact_number = mobile
			var previousData = await User.validateUserData(mobile)
			if(previousData && previousData.length){
				var servicehistories = await serviceHistory.getUserData()
				var userData = previousData[0]
			}else{
				var savedData =await  User.saveData(savedata)
				var servicehistories = ''
				var userData = {user_id : savedData.insertId}
			}
		res.send(
				{
					success:true,
					msg: "Helper verified" ,
					serviceHistory:servicehistories,
					userData:userData,
					mobile: mobile,
					isUser: false,
					token: hash
				});
		} else {
		console.log("Not Authenticated");
		  res.status(400).send({ verification: false, msg: `Incorrect OTP` });
		}
	}catch(e){
		return {success:false,error:e.message}
	}
	
  });


export default {authUser}