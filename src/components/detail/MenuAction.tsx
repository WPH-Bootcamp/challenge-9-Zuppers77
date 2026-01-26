"use client";

import { Menu } from "@/types/entity";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch, useSelector } from "react-redux";
import { 
    addToCartApi, 
    updateCartItemApi, 
    removeCartItemApi
} from "@/features/cart/cartSlice";
import { 
    selectCartItemQuantityByMenuId, 
    selectCartItemIdByMenuId 
} from "@/features/cart/selectors";
import { AppDispatch, RootState } from "@/features/store";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function MenuAction({ menu }: { menu: Menu }) {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const restaurantId = Number(params.id);

  const qty = useSelector((state: RootState) => selectCartItemQuantityByMenuId(state, menu.id));
  const cartItemId = useSelector((state: RootState) => selectCartItemIdByMenuId(state, menu.id));
  
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAdd = async () => {
      if (!restaurantId || isNaN(restaurantId)) {
          toast.error("Restaurant Context Missing");
          return;
      }

      setIsUpdating(true);
      await dispatch(addToCartApi({ restaurantId, menuId: menu.id, quantity: 1 }));
      setIsUpdating(false);
  };

  const handleIncrement = async () => {
      if (!cartItemId) return;
      setIsUpdating(true);
      await dispatch(updateCartItemApi({ cartItemId, quantity: qty + 1 }));
      setIsUpdating(false);
  };

  const handleDecrement = async () => {
      if (!cartItemId) return;
      setIsUpdating(true);
      if (qty <= 1) {
          await dispatch(removeCartItemApi(cartItemId));
      } else {
          await dispatch(updateCartItemApi({ cartItemId, quantity: qty - 1 }));
      }
      setIsUpdating(false);
  };

  if (qty === 0) {
      return (
         <Button 
            className="bg-red-600 hover:bg-red-700 text-white rounded-full h-9 px-5" 
            onClick={handleAdd}
            disabled={isUpdating}
         >
            {isUpdating ? <Spinner className="w-4 h-4" /> : "Add"}
         </Button>
      );
  }

  return (
     <div className="flex items-center gap-4 max-w-24 h-9">
         <button 
            onClick={handleDecrement}
            disabled={isUpdating}
            className="flex items-center justify-center bg-white rounded-full border shadow-sm text-black hover:bg-gray-50 disabled:opacity-50"
         >
            <Minus className="w-6 h-6" />
         </button>
         <span className="text-sm font-bold w-full text-center flex justify-center">
             {qty}
         </span>
         <button 
            onClick={handleIncrement}
            disabled={isUpdating}
            className="flex items-center justify-center bg-red-600 rounded-full border shadow-sm text-white hover:bg-red-700 disabled:opacity-50"
         >
            <Plus className="w-6 h-6" />
         </button>
     </div>
  );
}
