import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/axios";
import { ENDPOINTS } from "@/services/api/endpoints";

export const useGetMyOrders = (params: { status?: string; search?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["my-orders", params],
    queryFn: async () => {
      const queryParams: Record<string, string | number | undefined> = { ...params };
      if (queryParams.status === "all") delete queryParams.status;
      if (!queryParams.search) delete queryParams.search;

      const response = await api.get(ENDPOINTS.ORDER.MY_ORDER, { params: queryParams });
      return response.data;
    },
  });
};
