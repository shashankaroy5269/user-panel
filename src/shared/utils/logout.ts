// import { Cookies } from "react-cookie";

// const cookie = new Cookies();

// const handleLogout = () => {
//   // ❌ remove access token
//   cookie.remove("token", { path: "/" });

//   // ❌ remove refresh token (VERY IMPORTANT)
//   cookie.remove("refreshToken", { path: "/" });

//   // ❌ clear storage
//   localStorage.clear();

//   // 🔄 reload
//   window.location.href = "/auth/login";
// };