import { AxiosInstance } from "../http/axios";
import { API_PATHS } from "../routes/endpoints";

// ================= TYPES =================
export interface RegisterInput {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  password: string;
  confirm_password: string;
}

export interface RegisterResponse {
  status: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    address: string;
  };
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  token?: string;
  data?: any;
}

export interface OtpInput {
  userId: string;
  otp: string;
}

export interface OtpResponse {
  status: boolean;
  message: string;
}

// ================= REGISTER =================
export const registerUser = async (payload: RegisterInput) => {
  const res = await AxiosInstance.post<RegisterResponse>(
    API_PATHS.AUTH_FLOW.REGISTER,
    payload
  );
  return res.data;
};

// ================= LOGIN =================
export const loginUser = async (payload: LoginInput) => {
  const res = await AxiosInstance.post<LoginResponse>(
    API_PATHS.AUTH_FLOW.LOGIN,
    payload
  );
  return res.data;
};

// ================= OTP =================
export const verifyOtp = async (payload: OtpInput) => {
  const res = await AxiosInstance.post<OtpResponse>(
    API_PATHS.AUTH_FLOW.VERIFY_OTP,
    payload
  );
  return res.data;
};

// ================= RESET LINK =================
export const sendResetLink = async (email: string) => {
  const res = await AxiosInstance.post(
   API_PATHS.AUTH_FLOW.SEND_RESET_LINK,
    { email }
  );
  return res.data;
};

// ================= RESET PASSWORD =================
export const updatePassword = async ({
  userId,
  token,
  password,
  confirmPassword,
}: {
  userId: string;
  token: string;
  password: string;
  confirmPassword: string;
}) => {
  const res = await AxiosInstance.post(
    `${API_PATHS.AUTH_FLOW.CHANGE_PASSWORD}/${userId}/${token}`,
    {
      password,
      confirm_password: confirmPassword,
    }
  );

  return res.data;
};