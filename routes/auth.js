const express= require('express');
const { requestOtp, verifyOtp ,register ,login} = require('../controllers/auth');
// const authControllers="../controllers/auth.js";

const router = express.Router();

router.post('/register/request-otp', requestOtp);
router.post('/register/verify-otp', verifyOtp);
router.post('/register',register);
router.post('/login',login);


module.exports=router