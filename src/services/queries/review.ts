import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import api from "@/services/api/axios";
import { ENDPOINTS } from "@/services/api/endpoints";
import { toast } from "sonner";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useSubmitReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { transactionId: string; restaurantId: number; star: number; comment: string; menuIds: number[] }) => {
            const response = await api.post(ENDPOINTS.REVIEW.SUBMIT, data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Review submitted successfully!");
            queryClient.invalidateQueries({ queryKey: ["my-orders"] });
            queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
        },
        onError: (error: ApiError) => {
            toast.error(error.response?.data?.message || "Failed to submit review");
        },
    });
};

export const useGetMyReviews = (params?: { page?: number; limit?: number }) => {
    return useQuery({
        queryKey: ["my-reviews", params],
        queryFn: async () => {
            const response = await api.get(ENDPOINTS.REVIEW.MY_REVIEWS, { params });
            return response.data;
        },
    });
};

export const useUpdateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: { star: number; comment: string } }) => {
            const response = await api.put(ENDPOINTS.REVIEW.UPDATE_BY_ID(id), data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Review updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["my-orders"] });
            queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
        },
        onError: (error: ApiError) => {
            toast.error(error.response?.data?.message || "Failed to update review");
        },
    });
};

export const useDeleteReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await api.delete(ENDPOINTS.REVIEW.DELETE_BY_ID(id));
            return response.data;
        },
        onSuccess: () => {
            toast.success("Review deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["my-orders"] });
            queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
        },
        onError: (error: ApiError) => {
            toast.error(error.response?.data?.message || "Failed to delete review");
        },
    });
};
