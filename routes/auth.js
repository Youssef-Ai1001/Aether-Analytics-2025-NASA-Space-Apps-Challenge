const express= require('express');
const { requestOtp, verifyOtp ,register ,login , deleteUser, getUserByEmail} = require('../controllers/auth');
// const authControllers="../controllers/auth.js";

const router = express.Router();

router.post('/register/request-otp', requestOtp);
router.post('/register/verify-otp', verifyOtp);
router.post('/register',register);
router.post('/login',login);
router.delete('/delete',deleteUser);
router.get('/user',getUserByEmail)


module.exports=router