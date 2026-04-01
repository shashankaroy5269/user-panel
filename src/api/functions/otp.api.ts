import { toast } from "sonner";
import AxiosInstance from "../axios";
import { endpoints } from "../endpoints";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";



export const useVerifyOtp = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (payload: { userId: string; otp: string }) => {
            const res = await AxiosInstance.post(endpoints.auth.otp, payload);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Email verified successfully!");
            router.push("/auth/login");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Invalid or Expired OTP");
        }
    });
};