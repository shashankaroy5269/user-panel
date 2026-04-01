import useAppStore from "@/src/store/useAppStore";
import { useMutation } from "@tanstack/react-query";
import AxiosInstance from "@/src/api/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { endpoints } from "@/src/api/endpoints";


export const useRegister = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (payload: any) => {
            const res = await AxiosInstance.post(endpoints.auth.signup, payload);
            return res.data;
        },

        onSuccess: (data) => {
            console.log("REGISTER RESPONSE ", data);

            // 🔥 SAFE USER ID EXTRACTION
            const userId =
                data?.data?.id
            data?.data?._id
            data?.user?._id;

            if (!userId) {
                toast.error("User ID not found from server");
                return;
            }

            toast.success(data.message || "Registration successful");

           
            router.push(`/auth/otp?userId=${userId}`);
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message || "Registration Failed"
            );
        },
    });
};

// ✅ 2. Login Hook
export const useLogin = () => {
  const router = useRouter();
  const [, setCookie] = useCookies(["token", "userid"]);
  const { setSession } = useAppStore();

  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await AxiosInstance.post(endpoints.auth.login, payload);
      return res.data;
    },

    onSuccess: (data) => {
      console.log("LOGIN DATA 🔥", data);

      if (data.status) {
       
        setCookie("token", data.token, { path: "/", maxAge: 3600 });
        setCookie("userid", data.data?._id, { path: "/", maxAge: 3600 });

        
        setSession(data.token);

       
        localStorage.setItem("user", JSON.stringify(data.data));

        router.push("/");
      }
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useVerifyOtp = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (payload: { userId: string; otp: string }) => {
            const res = await AxiosInstance.post(endpoints.auth.otp, {
                userId: payload.userId,
                otp: String(payload.otp),
            });

            return res.data;
        },

        onSuccess: () => {
            toast.success("Email verified successfully!");
            router.push("/auth/login");
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message || "Invalid or Expired OTP"
            );
        },
    });
};


export const useForgotPass = () => {
    return useMutation({
        mutationFn: async (email: string) => {
            const res = await AxiosInstance.post(
                endpoints.auth.resetlink,
                { email }
            );
            return res.data;
        },

        onSuccess: (data) => {
            toast.success(
                data.message || "Reset link sent to your email!"
            );
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message || "Email not found"
            );
        },
    });
};


export const useResetPassword = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async ({
            id,
            token,
            data,
        }: {
            id: string;
            token: string;
            data: any;
        }) => {
            const res = await AxiosInstance.post(
                `/reset-password/${id}/${token}`,
                data
            );
            return res.data;
        },

        onSuccess: () => {
            toast.success("Password updated successfully!");
            router.push("/auth/login");
        },

        onError: (error: any) => {
            toast.error(
                error.response?.data?.message ||
                "Link expired or invalid"
            );
        },
    });
};


export const useLogout = () => {
    const router = useRouter();
    const [, , removeCookie] = useCookies(["token", "userid"]);


    return useMutation({
        mutationFn: async () => {
            const res = await AxiosInstance.post(
                endpoints.auth.logout
            );
            return res.data;
        },
        onSuccess: () => {
            removeCookie("token", { path: "/" });
            removeCookie("userid", { path: "/" });

            toast.success("Logged out successfully");
            router.push("/auth/login");
        },
    });
};