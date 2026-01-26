import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CartGroup, CartSummary, CartResponse, AddToCartResponse } from "@/types/entity";

import api from "@/services/api/axios";
import { ENDPOINTS } from "@/services/api/endpoints";
import { toast } from "sonner";
import { RootState } from "@/features/store";

interface TransactionPricing {
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  totalPrice: number;
}

interface TransactionItem {
  menuId: number;
  quantity: number;
  price: number;
}

interface TransactionRestaurant {
  restaurantId: number;
  items: TransactionItem[];
}

interface Transaction {
  id: string;
  createdAt: string;
  paymentMethod: string;
  restaurants: TransactionRestaurant[];
  pricing: TransactionPricing;
}

interface CartState {
  cartGroups: CartGroup[];
  summary: CartSummary;
  isLoading: boolean;
  error: string | null;
  lastTransaction: Transaction | null;
}

const initialState: CartState = {
  cartGroups: [],
  summary: {
    totalItems: 0,
    totalPrice: 0,
    restaurantCount: 0,
  },
  isLoading: false,
  error: null,
  lastTransaction: null,
};

// Async Thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<CartResponse>(ENDPOINTS.CART.BASE);
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
  }
});

export const addToCartApi = createAsyncThunk(
  "cart/add",
  async ({ restaurantId, menuId, quantity }: { restaurantId: number; menuId: number; quantity: number }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post<AddToCartResponse>(ENDPOINTS.CART.BASE, {
        restaurantId,
        menuId,
        quantity,
      });
      dispatch(fetchCart()); 
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to add to cart");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const updateCartItemApi = createAsyncThunk(
  "cart/update",
  async ({ cartItemId, quantity }: { cartItemId: number; quantity: number }, { dispatch, rejectWithValue }) => {
    try {
      await api.put(ENDPOINTS.CART.UPDATE_BY_ID(cartItemId), { quantity });
      dispatch(fetchCart());
      return { cartItemId, quantity };
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error("Failed to update cart");
      return rejectWithValue(err.message);
    }
  }
);

interface CheckoutPayload {
    restaurantId: number;
    deliveryAddress: string;
    paymentMethod: string;
}

export const checkoutApi = createAsyncThunk(
  "cart/checkout",
  async ({ restaurantId, deliveryAddress, paymentMethod }: CheckoutPayload, { getState, dispatch, rejectWithValue }) => {
    try {
       const state = getState() as RootState;
       const cartGroups = state.cart.cartGroups as CartGroup[];
       const group = cartGroups.find(g => g.restaurant.id === restaurantId);
       
       if (!group) throw new Error("Cart group not found");

       const payload = {
           restaurants: [
               {
                   restaurantId: group.restaurant.id,
                   items: group.items.map(item => ({
                       menuId: item.menu.id,
                       quantity: item.quantity
                   }))
               }
           ],
           deliveryAddress,
           phone: state.auth.user?.phone || "0812-3456-7890",
           paymentMethod,
           notes: ""
       };

       const response = await api.post(ENDPOINTS.ORDER.CHECKOUT, payload);
       dispatch(fetchCart());
       return response.data.data.transaction;
    } catch (error: unknown) {
       const err = error as { response?: { data?: { message?: string } }; message?: string };
       toast.error(err.response?.data?.message || "Checkout failed");
       return rejectWithValue(err.message);
    }
  }
);

export const decrementCartItemApi = createAsyncThunk(
  "cart/decrement",
  async ({ cartItemId, currentQuantity }: { cartItemId: number; currentQuantity: number }, { dispatch, rejectWithValue }) => {
     try {
        if (currentQuantity <= 1) {
            await dispatch(removeCartItemApi(cartItemId)).unwrap();
        } else {
            await dispatch(updateCartItemApi({ cartItemId, quantity: currentQuantity - 1 })).unwrap();
        }
        return cartItemId;
     } catch (error: unknown) {
        const err = error as { message?: string };
        return rejectWithValue(err.message);
     }
  }
);

export const removeCartItemApi = createAsyncThunk(
    "cart/remove",
    async (cartItemId: number, { dispatch, rejectWithValue }) => {
        try {
            await api.delete(ENDPOINTS.CART.DELETE_BY_ID(cartItemId));
            dispatch(fetchCart());
            return cartItemId;
        } catch (error: unknown) {
            const err = error as { message?: string };
            toast.error("Failed to remove item");
            return rejectWithValue(err.message);
        }
    }
);



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
     clearCartState: (state) => {
         state.cartGroups = [];
         state.summary = initialState.summary;
     }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartGroups = action.payload.data.cart;
      state.summary = action.payload.data.summary;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(checkoutApi.fulfilled, (state, action) => {
        state.lastTransaction = action.payload;
    });
  },
});

export const { clearCartState } = cartSlice.actions;




export default cartSlice.reducer;
