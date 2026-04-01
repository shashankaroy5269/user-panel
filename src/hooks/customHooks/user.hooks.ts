import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProfile, logoutUser } from "@/src/api/functions/user.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    retry: 1,
  });
};


export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: (data) => {
      toast.success(data?.message || "Logged out successfully");

      
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      
      queryClient.clear();

      router.push("/auth/login");
    },

    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Logout failed"
      );
    },
  });
};