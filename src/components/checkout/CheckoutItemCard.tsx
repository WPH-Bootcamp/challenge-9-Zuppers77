"use client";

import { CartItem } from "@/types/entity";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/features/store";
import { updateCartItemApi, decrementCartItemApi } from "@/features/cart/cartSlice";
import { useState } from "react";

function CheckoutRow({ item }: { item: CartItem }) {
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
                    <Image 
                        src={item.menu.image} 
                        alt={item.menu.foodName} 
                        fill 
                        className="object-cover"
                    />
                </div>
                <div>
                    <h4 className="font-bold text-base">{item.menu.foodName}</h4>
                    <p className="font-bold text-base">{formatCurrency(item.menu.price)}</p>
                </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1">
                <button 
                    onClick={handleDecrement}
                    disabled={isUpdating}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-black hover:bg-gray-100 disabled:opacity-50"
                >
                   <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold w-6 text-center flex justify-center">
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

export default function CheckoutItemCard({ items, restaurantName }: { items: CartItem[], restaurantName: string }) {
  return (
    <div className="bg-card p-6 rounded-xl border shadow-sm">
        <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg flex items-center gap-2">
                <span className="text-xl">🏪</span> 
                {restaurantName}
            </h3>
            <span className="bg-gray-100 text-xs font-bold px-3 py-1 rounded-full">Items</span>
        </div>

        <div className="space-y-6">
            {items.map((item) => (
                <CheckoutRow key={item.id} item={item} />
            ))}
        </div>
    </div>
  );
}
