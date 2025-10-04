export type CheckEmailResponse = {
  exists: boolean;
  userId?: string;
};

export type SendOtpResponse = {
  success: boolean;
};

export type VerifyOtpResponse = {
  success: boolean;
};

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function checkEmail(email: string): Promise<CheckEmailResponse> {
  await delay(600);
  const exists = /@existing\.(com|org|net)$/i.test(email) || email.toLowerCase().startsWith('demo');
  return { exists, userId: exists ? 'user_demo_123' : undefined };
}

export async function sendOtp(_email: string): Promise<SendOtpResponse> {
  await delay(800);
  void _email;
  return { success: true };
}

export async function verifyOtp(_email: string, otp: string): Promise<VerifyOtpResponse> {
  await delay(500);
  void _email;
  const success = /^\d{6}$/.test(otp.trim());
  return { success };
}

