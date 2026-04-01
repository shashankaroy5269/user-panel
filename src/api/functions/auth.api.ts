import { MutationFunction } from "@tanstack/react-query";
import AxiosInstance from "../axios";
import { endpoints } from "../endpoints";
// 1. Reset Link (Email bhejne ke liye)
export const ResetLinkFunction: MutationFunction<any, { email: string }> = async (payload) => {
    const res = await AxiosInstance.post(endpoints.auth.reset_link, payload);
    return res.data;
};


export const ResetPasswordFunction = async ({ id, token, data }: { id: string, token: string, data: any }) => {
    const res = await AxiosInstance.post(`/reset-password/${id}/${token}`, data);
    return res.data;
};