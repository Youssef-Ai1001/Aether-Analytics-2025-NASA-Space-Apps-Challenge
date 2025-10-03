require('dotenv').config()
const express=require('express');
const app=express();
// const {PrismaClient}=require('@prisma/client');
// const prisma=new PrismaClient();
const PORT=process.env.PORT;
// const AIRNOW_API_KEY=process.env.AIRNOW_API_KEY;
const dashboardRoutes=require('./routes/dashboard');
const authRoutes=require('./routes/auth');

app.use(express.json());

app.use('/api/dashboard',dashboardRoutes);
app.use('/api/auth',authRoutes)

app.listen(PORT,(req,res)=>{
    console.log(`APP listening on port ${PORT}`);
})