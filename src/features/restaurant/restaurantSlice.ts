import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Restaurant, RestaurantFilters } from "@/types/entity";
import { RootState } from "@/features/store";

interface RestaurantState {
  allRecommended: Restaurant[];
  displayLimit: number;
  filters: RestaurantFilters;
  detailMenuCategory: string;
  detailMenuLimit: number;
}

const initialState: RestaurantState = {
  allRecommended: [],
  displayLimit: 12,
  filters: {
    location: undefined,
    range: undefined,
    priceMin: undefined,
    priceMax: undefined,
    rating: undefined,
    category: undefined,
  },
  detailMenuCategory: "All Menu",
  detailMenuLimit: 8,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setAllRecommended: (state, action: PayloadAction<Restaurant[]>) => {
      state.allRecommended = action.payload;
    },
    showMore: (state) => {
      state.displayLimit += 12;
    },
    resetRecommended: (state) => {
      state.displayLimit = 12;
    },
    setFilter: (state, action: PayloadAction<Partial<RestaurantFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setDetailMenuCategory: (state, action: PayloadAction<string>) => {
      state.detailMenuCategory = action.payload;
      state.detailMenuLimit = 8;
    },
    showMoreDetailMenus: (state) => {
      state.detailMenuLimit += 8;
    },
    resetDetailState: (state) => {
      state.detailMenuCategory = "All Menu";
      state.detailMenuLimit = 8;
    }
  },
});

export const { 
    setAllRecommended, showMore, resetRecommended, setFilter, resetFilters,
    setDetailMenuCategory, showMoreDetailMenus, resetDetailState
} = restaurantSlice.actions;

export const selectVisibleRecommended = (state: RootState) => 
  state.restaurant.allRecommended.slice(0, state.restaurant.displayLimit);

export const selectHasMoreRecommended = (state: RootState) => 
  state.restaurant.displayLimit < state.restaurant.allRecommended.length;

export const selectRestaurantFilters = (state: RootState) => state.restaurant.filters;
export const selectDetailMenuCategory = (state: RootState) => state.restaurant.detailMenuCategory;
export const selectDetailMenuLimit = (state: RootState) => state.restaurant.detailMenuLimit;

export default restaurantSlice.reducer;
