import { MutationFunction } from "@tanstack/react-query";
import AxiosInstance from "../axios";
import { endpoints } from "../endpoints";

export const RegistrationFunction: MutationFunction<registerResponse> = async (payload: registerResponse) => {
    const res = await AxiosInstance.post<registerResponse>(endpoints.auth.signup, payload)
    return res.data

} 