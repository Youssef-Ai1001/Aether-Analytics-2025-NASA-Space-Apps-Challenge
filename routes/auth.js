const express= require('express');
const { requestOtp, verifyOtpAndRegister } = require('../controllers/auth');
// const authControllers="../controllers/auth.js";

const router = express.Router();

router.post('/register/request-otp', requestOtp);
router.post('/register/verify-otp', verifyOtpAndRegister);

module.exports=router