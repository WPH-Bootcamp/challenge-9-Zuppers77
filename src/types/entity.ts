export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  latitude: number;
  longitude: number;
  createdAt: string;
}

export interface Restaurant {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  reviewCount: number;
  menuCount: number;
  priceRange: {
    min: number;
    max: number;
  };
  distance: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface RestaurantListResponse {
  success: boolean;
  data: {
    restaurants: Restaurant[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface RestaurantFilters {
  location?: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  category?: string;
}
export interface RecommendedResponse {
  success: boolean;
  message: string;
  data: {
    recommendations: Restaurant[];
    message: string;
  };
}

export interface Menu {
  id: number;
  foodName: string;
  price: number;
  type: "food" | "drink";
  image: string;
}

export interface Review {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  transactionId?: string;
}

export interface RestaurantDetail extends Restaurant {
  averageRating: number;
  coordinates: {
    lat: number;
    long: number;
  };
  totalMenus: number;
  totalReviews: number;
  menus: Menu[];
  reviews: Review[];
  category: string;
}

export interface RestaurantDetailResponse {
  success: boolean;
  data: RestaurantDetail;
}

export interface ReviewListResponse {
  success: boolean;
  data: {
    reviews: Review[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface CartItem {
  id: number;
  menuId: number;
  menu: Menu;
  quantity: number;
  price: number;
  notes?: string;
}

export interface CartGroup {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: CartItem[];
  subtotal: number;
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  restaurantCount: number;
}

export interface CartResponse {
  success: boolean;
  data: {
    cart: CartGroup[];
    summary: CartSummary;
  };
}

export interface AddToCartResponse {
  success: boolean;
  message: string;
  data: CartItem;
}
