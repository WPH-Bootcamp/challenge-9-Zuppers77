"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { selectCartGroupById } from "@/features/cart/selectors";
import { RootState } from "@/features/store";

interface FloatingCartBarProps {
    restaurantId: number;
}

export default function FloatingCartBar({ restaurantId }: FloatingCartBarProps) {
    const router = useRouter();
    const group = useSelector((state: RootState) => selectCartGroupById(state, restaurantId));

    const calculations = useMemo(() => {
        if (!group) return null;
        const totalItems = group.items.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = group.subtotal;
        return { totalItems, totalPrice };
    }, [group]);

    if (!calculations || calculations.totalItems === 0) {
        return null;
    }

    const { totalItems, totalPrice } = calculations;

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-transparent z-50 pointer-events-none">
            <div className="container mx-auto max-w-4xl pointer-events-auto">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-center justify-between animate-in slide-in-from-bottom-4 duration-300">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-gray-900 font-bold">
                            <ShoppingBag className="w-5 h-5 fill-current" />
                            <span>{totalItems} Items</span>
                        </div>
                        <p className="text-gray-500 text-sm font-semibold">
                            {formatCurrency(totalPrice)}
                        </p>
                    </div>

                    <Button 
                        onClick={() => router.push(`/checkout?restaurantId=${restaurantId}`)}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 font-bold h-10 shadow-md shadow-red-200"
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
}
