export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    PROFILE: "/api/auth/profile",
    UPDATE_PROFILE: "/api/auth/profile",
  },
  RESTAURANT: {
    RECOMMENDED: "/api/resto/recommended", 
    SEARCH: "/api/resto/search",
    GET_RESTAURANTS: "/api/resto",
    GET_RESTAURANT_BY_ID: (id: number | string) => `/api/resto/${id}`,
  },
  REVIEW: {
    GET_REVIEWS_BY_RESTAURANT_ID: (id: number | string) => `/api/review/restaurant/${id}`,
    SUBMIT: "/api/review",
    UPDATE_BY_ID: (id: number | string) => `/api/review/${id}`,
    DELETE_BY_ID: (id: number | string) => `/api/review/${id}`,
    MY_REVIEWS: "/api/review/my-reviews",
  },
  CART: {
    BASE: "/api/cart",
    UPDATE_BY_ID: (id: number | string) => `/api/cart/${id}`,
    DELETE_BY_ID: (id: number | string) => `/api/cart/${id}`,
  },
  ORDER: {
    CHECKOUT: "/api/order/checkout",
    MY_ORDER: "/api/order/my-order",
  }
};
