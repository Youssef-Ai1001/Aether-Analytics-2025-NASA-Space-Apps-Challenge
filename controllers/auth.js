const { sendOtpEmail } =require("../utils/setupEmail");

const asyncWrapper = require("../middlewares/asyncWrapper");
const bcrypt=require('bcrypt');
const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();
const generateOTP=require('../utils/generateOTP');
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");

const requestOtp =asyncWrapper(
async (req, res) => {
  const { email } = req.body;

  // Check if user already exists
  const existingUser = await prisma.users.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  // Generate OTP
  const otp = generateOTP();
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Save OTP in DB (delete old ones for same email)
  await prisma.otpVerification.deleteMany({ where: { email } });
  await prisma.otpVerification.create({
    data: { email, otpHash, expiresAt },
  });

  // Send OTP email
  await sendOtpEmail(email, otp);

  return res.status(200).json({ message: 'OTP sent to your email' });

});


const verifyOtp = asyncWrapper(
async (req, res) => {
  const {email,otp} = req.body;

  // Find OTP entry
  const otpRecord = await prisma.otpVerification.findFirst({ where: { email } });
  if (!otpRecord) return res.status(400).json({ message: 'OTP not found' });

  // Check expiry
  if (otpRecord.expiresAt < new Date()) {
    return res.status(400).json({ message: 'OTP expired' });
  }

  // Compare OTP

  const otpExist=await prisma.otpVerification.findFirst({
    where:{
      email:email
    }
  })

  const isValid = await bcrypt.compare(otp, otpRecord.otpHash);
  if (!isValid) return res.status(400).json({ message: 'Invalid OTP' });
  await prisma.otpVerification.update({
    where:{id:otpExist.id},
    data:{
      verified:true
    }
  })
   res.status(201).json({ message: 'Verified Successfully' });
  //Location stateCode 
});

const register=asyncWrapper(
  async(req,res)=>{
    const{name,email,location,sensitive}=req.body;
    const emailVerfied=await prisma.otpVerification.findFirst({
      where:{email}
    })
    if(!emailVerfied.verified)
    {
      const failure=appError.create("Please verify your email",400,httpStatusText.FAILED);
      return res.status(400).json(failure);
    }
    const stateCode=await prisma.locations.findFirst({
    where:{
      name:location
    },
    select:{stateCode:true}
  })

  // Create user
  await prisma.users.create({
    data: { 
      name,
      email,
      stateCode:stateCode.stateCode,
      sensitive 
    },
  });

  // Delete OTP after successful verification
  await prisma.otpVerification.deleteMany({ where: { email } });

  res.status(201).json({ message: 'User registered successfully' });
  }
)

const login=asyncWrapper(
  async(req,res)=>{
    const {email}=req.body;
    const emailExist=await prisma.users.findFirst({
      where:{email}
    })
    if(emailExist)
    {
      const success={message:"Logged in successfully",statusCode:200}
      res.status(200).json(success);return;
    }
    const failure=appError.create("Please sign up first",400,httpStatusText.FAILED)
    res.status(400).json(failure);
  }
)

const deleteUser=asyncWrapper(
  async(req,res)=>{
  await prisma.users.delete({
  where: { email: req.body.email }
});
res.json({Message:"Deleted"})
  }
)
module.exports={
    requestOtp,
    verifyOtp,
    register,
    login,
    deleteUser
}