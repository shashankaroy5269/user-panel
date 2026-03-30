"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "@/src/core/http/axios";

export const useDoctors = (page: number) => {
  return useQuery({
    queryKey: ["doctors", page],
    queryFn: async () => {
      const res = await AxiosInstance.get("/admin/doctor/list", {
        params: {
          page,
          limit: 6, // 👉 per page doctors
        },
      });

      return res.data;
    },
    keepPreviousData: true, // smooth pagination
  });
};