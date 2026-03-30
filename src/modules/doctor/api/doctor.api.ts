import { AxiosInstance } from "@/src/core/http/axios";
import { API_PATHS } from "@/src/core/routes/endpoints";


export const fetchDoctors = async (filters: any) => {
  console.log("FILTERS SENT:", filters); // 👈 ADD THIS

  const { data } = await AxiosInstance.post(
    API_PATHS.DOCTOR_FLOW.FETCH_LIST,
    filters
  );

  console.log("API RESPONSE:", data); // 👈 ADD THIS

  return data;
};