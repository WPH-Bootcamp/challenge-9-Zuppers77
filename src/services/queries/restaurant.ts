import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import api from "@/services/api/axios";
import { ENDPOINTS } from "@/services/api/endpoints";
import { RecommendedResponse, RestaurantListResponse, RestaurantFilters } from "@/types/entity";

export const useGetRecommended = () => {
  return useQuery({
    queryKey: ["recommended"],
    queryFn: async () => {
      const response = await api.get<RecommendedResponse>(ENDPOINTS.RESTAURANT.RECOMMENDED);
      return response.data;
    },
    enabled: true,
  });
};

export const useSearchRestaurants = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ["search", query, page],
    queryFn: async () => {
      const response = await api.get(ENDPOINTS.RESTAURANT.SEARCH, {
        params: { q: query, page, limit: 20 }
      });
      return response.data;
    },
    enabled: !!query,
  });
};
export const useGetRestaurantsInfinite = (filters: RestaurantFilters) => {
  return useInfiniteQuery({
    queryKey: ["restaurants", filters],
    queryFn: async ({ pageParam = 1 }) => {
      const { location, range, priceMin, priceMax, rating, category } = filters;
      const params: Record<string, string | number> = { page: pageParam, limit: 12 };
      if (location) params.location = location;
      if (range) params.range = range;
      if (priceMin) params.priceMin = priceMin;
      if (priceMax) params.priceMax = priceMax;
      if (rating) params.rating = rating;
      if (category) params.category = category;

      const response = await api.get<RestaurantListResponse>(ENDPOINTS.RESTAURANT.GET_RESTAURANTS, { params });
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
