"use client";

import { CartGroup, CartItem } from "@/types/entity";
import CartItemRow from "./CartItemRow";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

import { useRouter } from "next/navigation";

export default function RestaurantCartCard({ group }: { group: CartGroup }) {
  const router = useRouter();

  const handleCheckout = () => {
      router.push(`/checkout?restaurantId=${group.restaurant.id}`);
  };


  return (
    <div className="bg-card border rounded-xl overflow-hidden mb-6 shadow-sm">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
            <Link href={`/restaurants/${group.restaurant.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-muted">
                    <Image 
                        src={group.restaurant.logo} 
                        alt={group.restaurant.name} 
                        fill 
                        className="object-cover"
                    />
                </div>
                <h3 className="font-bold text-lg flex items-center gap-1">
                    {group.restaurant.name}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </h3>
            </Link>
        </div>

        {/* content */}
        <div className="p-2">
            {group.items.map((item: CartItem) => (
                <CartItemRow key={item.id} item={item} />
            ))}
        </div>

        {/* Footer / Total */}
        <div className="p-4 bg-muted/20 border-t flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
                 <p className="text-sm text-muted-foreground">Total</p>
                 <p className="text-xl font-bold text-primary">{formatCurrency(group.subtotal)}</p>
            </div>
            
            <Button 
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white rounded-full px-8"
                onClick={handleCheckout}
            >
                Checkout
            </Button>
        </div>
    </div>
  );
}
