const nodemailer=require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or use SMTP settings
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOtpEmail(to, otp) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your OTP Code',
    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 400px;
        margin: auto;
        padding: 20px;
        border: 1px solid #eee;
        border-radius: 8px;
        background: #f9f9f9;
      ">
        <h2 style="text-align: center; color: #4A90E2;">Email Verification</h2>
        
        <p style="font-size: 16px; color: #333;">
          Hello,
        </p>

        <p style="font-size: 16px; color: #333;">
          Please use the following one-time password (OTP) to verify your account:
        </p>

        <div style="
          font-size: 28px;
          font-weight: bold;
          text-align: center;
          margin: 20px 0;
          color: #4A90E2;
          letter-spacing: 4px;
        ">
          ${otp}
        </div>

        <p style="font-size: 14px; color: #666;">
          This code will expire in <strong>10 minutes</strong>.
        </p>

        <p style="font-size: 14px; color: #666; text-align: center; margin-top: 20px;">
          Thank you for using our service!
        </p>
      </div>
    `
  });
}

module.exports={
    sendOtpEmail
}
