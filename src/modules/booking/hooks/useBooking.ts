"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "@/src/core/http/axios";

// 🔥 GET SLOTS
export const useSlots = (doctorId: string, date: string) => {
  return useQuery({
    queryKey: ["slots", doctorId, date],
    queryFn: async () => {
      if (!doctorId || !date) return { data: [] };

      const res = await AxiosInstance.get(
        `/doctor/slots/${doctorId}?date=${date}`
      );

      return res.data;
    },
    enabled: !!doctorId && !!date,
  });
};

// 🔥 BOOK APPOINTMENT
export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await AxiosInstance.post(
        "/doctor/appointment",
        payload
      );
      return res.data;
    },

    onSuccess: () => {
      // 🔥 SLOT REFRESH
      queryClient.invalidateQueries({ queryKey: ["slots"] });
    },
  });
};