"use client";

import { CartItem } from "@/types/entity";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/features/store";
import { updateCartItemApi, decrementCartItemApi } from "@/features/cart/cartSlice";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";

export default function CartItemRow({ item }: { item: CartItem }) {
  const dispatch = useDispatch<AppDispatch>();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleIncrement = async () => {
      setIsUpdating(true);
      await dispatch(updateCartItemApi({ cartItemId: item.id, quantity: item.quantity + 1 }));
      setIsUpdating(false);
  };

  const handleDecrement = async () => {
      setIsUpdating(true);
      await dispatch(decrementCartItemApi({ cartItemId: item.id, currentQuantity: item.quantity }));
      setIsUpdating(false);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b last:border-0 hover:bg-gray-50/50 transition-colors px-4 rounded-lg">
       <div className="flex items-center gap-4">
           <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0">
               <Image
                  src={item.menu.image}
                  alt={item.menu.foodName}
                  fill
                  className="object-cover"
               />
           </div>
           <div>
               <h4 className="font-bold text-sm lg:text-base">{item.menu.foodName}</h4>
               <p className="text-sm font-semibold text-muted-foreground">{formatCurrency(item.menu.price)}</p>
           </div>
       </div>

       <div className="flex items-center gap-3">
             <button
                onClick={handleDecrement}
                disabled={isUpdating}
                className="w-8 h-8 flex items-center justify-center bg-white border rounded-full shadow-sm text-black hover:bg-gray-50 disabled:opacity-50"
             >
                <Minus className="w-4 h-4" />
             </button>
             <span className="text-sm font-bold w-6 text-center block">
                 {item.quantity}
             </span>
             <button 
                onClick={handleIncrement}
                disabled={isUpdating}
                className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-full shadow-sm text-white hover:bg-red-700 disabled:opacity-50"
             >
                <Plus className="w-4 h-4" />
             </button>
       </div>
    </div>
  );
}
