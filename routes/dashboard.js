const express=require('express');
const router=express.Router();
const dashboardController=require('../controllers/dashboard');

router.get('/data',dashboardController.dashboardData)

module.exports=router