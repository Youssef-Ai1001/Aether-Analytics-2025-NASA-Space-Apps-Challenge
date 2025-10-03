const express= require('express');
const { requestOtp, verifyOtpAndRegister , login} = require('../controllers/auth');
// const authControllers="../controllers/auth.js";

const router = express.Router();

router.post('/register/request-otp', requestOtp);
router.post('/register/verify-otp', verifyOtpAndRegister);
router.post('/login',login);


module.exports=router