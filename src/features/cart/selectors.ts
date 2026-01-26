
import { RootState } from "@/features/store";
import { CartItem } from "@/types/entity";

export const selectCartGroups = (state: RootState) => state.cart.cartGroups;
export const selectCartSummary = (state: RootState) => state.cart.summary;
export const selectCartTotalItems = (state: RootState) => state.cart.summary.totalItems;
export const selectCartLoading = (state: RootState) => state.cart.isLoading;

export const selectCartItemQuantityByMenuId = (state: RootState, menuId: number) => {
    for (const group of state.cart.cartGroups) {
        const item = group.items.find((i: CartItem) => i.menu.id === menuId);
        if (item) return item.quantity;
    }
    return 0;
};
export const selectCartItemIdByMenuId = (state: RootState, menuId: number) => {
    for (const group of state.cart.cartGroups) {
        const item = group.items.find((i: CartItem) => i.menu.id === menuId);
        if (item) return item.id;
    }
    return null;
}

export const selectCartGroupById = (state: RootState, restaurantId: number) => 
    state.cart.cartGroups.find(g => g.restaurant.id === restaurantId);

export const selectCheckoutCalculations = (state: RootState, restaurantId: number) => {
    const group = selectCartGroupById(state, restaurantId);
    if (!group) return null;

    const subtotal = group.subtotal;
    const totalItems = group.items.reduce((acc, item) => acc + item.quantity, 0);
    
    const deliveryFee = 10000;
    const serviceFee = 1000;
    
    const total = subtotal + deliveryFee + serviceFee;

    return {
        subtotal,
        totalItems,
        deliveryFee,
        serviceFee,
        total
    };
};

export const selectLastTransaction = (state: RootState) => state.cart.lastTransaction;
