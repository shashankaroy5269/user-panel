import { MutationFunction } from "@tanstack/react-query";
import AxiosInstance from "../axios";
import {endpoints} from "../endpoints"


export interface loginResponse {
    status: boolean;
    message: string;
    token?: string;
    data?: any;
}

export const LoginFunction: MutationFunction<loginResponse, any> = async (payload) => {
    const res = await AxiosInstance.post<loginResponse>(endpoints.auth.login, payload);
    return res.data;
};