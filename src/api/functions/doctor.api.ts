import AxiosInstance from "../axios";



export const fetchDoctors = async (params: { search: string; page: number }) => {
    const res = await AxiosInstance.post(`/user/doctor/list`, params);
    return res.data;
};


export const fetchSlots = async (payload: { doctorId: string; date: string }) => {
    const res = await AxiosInstance.post(`/user/slot/list`, payload);
    return res.data;
};


export const createAppointment = async (payload: any) => {
    const res = await AxiosInstance.post(`/doctor/appointment`, payload);
    return res.data;
};