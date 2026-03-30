

export const API_PATHS = {
  AUTH_FLOW: {
    REGISTER: "/auth/register",
    VERIFY_OTP: "/auth/verify_otp",
    LOGIN: "/auth/login",
    LOGOUT: "/user/logout",
    GET_PROFILE: "/user/profile",
    USER_HISTORY: "/user/history",
    SEND_RESET_LINK: "/auth/resetlink",
    CHANGE_PASSWORD: "/reset-password",
    NEARBY_CENTER: "/diagnostic/nearby",
  },

  DOCTOR_FLOW: {
    FETCH_LIST: "/user/doctor/list",
    BOOK_APPOINTMENT: "/doctor/appointment",
    AVAILABLE_SLOTS: "/user/slot/list",
  },
};

// 🔹 Flat array for middleware / interceptor usage
export const PUBLIC_ENDPOINTS: string[] = [
  API_PATHS.AUTH_FLOW.REGISTER,
  API_PATHS.AUTH_FLOW.VERIFY_OTP,
  API_PATHS.AUTH_FLOW.LOGIN,
  API_PATHS.AUTH_FLOW.LOGOUT,
  API_PATHS.AUTH_FLOW.GET_PROFILE,
  API_PATHS.AUTH_FLOW.USER_HISTORY,
  API_PATHS.AUTH_FLOW.SEND_RESET_LINK,
   API_PATHS.AUTH_FLOW.CHANGE_PASSWORD,
  API_PATHS.AUTH_FLOW.NEARBY_CENTER,

  // doctor
  API_PATHS.DOCTOR_FLOW.FETCH_LIST,
  API_PATHS.DOCTOR_FLOW.BOOK_APPOINTMENT,
  API_PATHS.DOCTOR_FLOW.AVAILABLE_SLOTS,
];