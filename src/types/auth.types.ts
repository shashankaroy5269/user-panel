// 🔐 REGISTER

export interface RegisterInput {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  password: string;
  confirm_password: string;
}

export interface RegisterOutput {
  status: boolean;
  message: string;
  userId: string;
  email: string;
  data: any;
}

// 📲 OTP VERIFY

export interface OtpInput {
  userId: string;
  otp: string;
}

export interface OtpOutput {
  status: boolean;
  message: string;
}

// 🔑 LOGIN

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginOutput {
  status: boolean;
  message: string;
  token?: string; // optional (backend dile)
}

// 🚪 LOGOUT

export interface LogoutOutput {
  status: boolean;
  message: string;
}

// 📧 RESET LINK

export interface ResetLinkInput {
  email: string;
}

export interface ResetLinkOutput {
  status: boolean;
  message: string;
}

// 🔄 RESET PASSWORD

export interface ResetPasswordInput {
  userId: string;
  token: string;
  password: string;
  confirm_password: string;
}

export interface ResetPasswordOutput {
  status: boolean;
  message: string;
}