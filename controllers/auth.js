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


const verifyOtpAndRegister = asyncWrapper(
async (req, res) => {
  const {name,email,location,sensitive,otp} = req.body;

  // Find OTP entry
  const otpRecord = await prisma.otpVerification.findFirst({ where: { email } });
  if (!otpRecord) return res.status(400).json({ message: 'OTP not found' });

  // Check expiry
  if (otpRecord.expiresAt < new Date()) {
    return res.status(400).json({ message: 'OTP expired' });
  }

  // Compare OTP
  const isValid = await bcrypt.compare(otp, otpRecord.otpHash);
  if (!isValid) return res.status(400).json({ message: 'Invalid OTP' });

  //Location stateCode 
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

  return res.status(201).json({ message: 'User registered successfully' });
});

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

module.exports={
    requestOtp,
    verifyOtpAndRegister,
    login
}