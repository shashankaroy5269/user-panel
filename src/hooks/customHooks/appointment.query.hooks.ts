import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDoctors,fetchSlots,createAppointment } from "@/src/api/functions/doctor.api";
import { toast } from "sonner";

export const useGetDoctors = (search: string, page: number) => {
    return useQuery({
        queryKey: ["doctors", search, page],
        queryFn: () => fetchDoctors({ search, page }),
       
    });
};

export const useGetSlots = (doctorId: string, date: string) => {
    return useQuery({
        queryKey: ["slots", doctorId, date],
        queryFn: () => fetchSlots({ doctorId, date }),
        enabled: !!doctorId && !!date, 
    });
};

export const useBookAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAppointment,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["slots"] });
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Booking failed");
        }
    });
};