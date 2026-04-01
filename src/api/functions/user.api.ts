import AxiosInstance from "../axios";
import { endpoints } from "../endpoints";


export const fetchProfile = async () => {
    const res = await AxiosInstance.get("/user/profile");
    return res.data;
};


export const logoutUser = async () => {
    const res = await AxiosInstance.post(endpoints.auth.logout);
    return res.data;
};