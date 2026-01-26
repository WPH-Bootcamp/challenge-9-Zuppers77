import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import api from "@/services/api/axios";
import { ENDPOINTS } from "@/services/api/endpoints";
import { RestaurantDetailResponse, ReviewListResponse } from "@/types/entity";

export const useGetRestaurantDetail = (id: string) => {
  return useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const response = await api.get<RestaurantDetailResponse>(ENDPOINTS.RESTAURANT.GET_RESTAURANT_BY_ID(id), {
        params: { limitMenu: 50, limitReview: 3 }
      });
      return response.data;
    },
    enabled: !!id,
  });
};

export const useGetRestaurantReviewsInfinite = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["restaurant-reviews", id],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<ReviewListResponse>(ENDPOINTS.REVIEW.GET_REVIEWS_BY_RESTAURANT_ID(id), {
        params: { page: pageParam, limit: 5 }
      });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
       if (lastPage.data.pagination.page < lastPage.data.pagination.totalPages) {
         return lastPage.data.pagination.page + 1;
       }
       return undefined;
    },
  });
};
