import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import api from "@/services/api/axios";
import { ENDPOINTS } from "@/services/api/endpoints";
import { setCredentials, updateUser } from "@/features/auth/authSlice";
import { AuthResponse, User } from "@/types/entity";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await api.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        dispatch(
          setCredentials({
            user: data.data.user,
            token: data.data.token,
          })
        );
        toast.success("Login successful! Welcome back.");
        router.push("/");
      }
    },
    onError: (error: ApiError) => {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });
};

export const useRegister = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async (formData: RegisterFormData) => {
      const response = await api.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, formData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        dispatch(
          setCredentials({
            user: data.data.user,
            token: data.data.token,
          })
        );
        toast.success("Registration successful! Welcome to Foody.");
        router.push("/");
      }
    },
    onError: (error: ApiError) => {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
    },
  });
};

export const useGetProfile = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const response = await api.get(ENDPOINTS.AUTH.PROFILE);
            return response.data;
        },
        enabled: options?.enabled,
    });
};

interface UpdateProfileResponse {
    success: boolean;
    message: string;
    data: User;
}

export const useUpdateProfile = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await api.put<UpdateProfileResponse>(ENDPOINTS.AUTH.UPDATE_PROFILE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
        if (data.success) {
            dispatch(updateUser(data.data)); 
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            toast.success("Profile updated successfully!");
        }
    },
    onError: (error: ApiError) => {
        toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });
};
