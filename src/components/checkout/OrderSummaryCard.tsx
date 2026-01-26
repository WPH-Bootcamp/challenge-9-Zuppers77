"use client";

import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface OrderSummaryCardProps {
    subtotal: number;
    totalItems: number;
    deliveryFee: number;
    serviceFee: number;
    onCheckout: () => void;
    isLoading: boolean;
}

export default function OrderSummaryCard({ 
    subtotal, 
    totalItems, 
    deliveryFee, 
    serviceFee, 
    onCheckout,
    isLoading 
}: OrderSummaryCardProps) {
  
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <div className="bg-card p-6 rounded-xl border shadow-sm space-y-6">
       <h3 className="font-bold text-lg">Payment Summary</h3>

       <div className="space-y-3 text-sm">
           <div className="flex justify-between text-gray-600">
               <span>Price ({totalItems} items)</span>
               <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
           </div>
           <div className="flex justify-between text-gray-600">
               <span>Delivery Fee</span>
               <span className="font-semibold text-gray-900">{formatCurrency(deliveryFee)}</span>
           </div>
           <div className="flex justify-between text-gray-600">
               <span>Service Fee</span>
               <span className="font-semibold text-gray-900">{formatCurrency(serviceFee)}</span>
           </div>
           
           <div className="border-t pt-3 flex justify-between items-center text-base">
               <span className="font-bold">Total</span>
               <span className="font-bold text-lg">{formatCurrency(total)}</span>
           </div>
       </div>

       {/* Replaced the Button component with the provided Code Edit snippet */}
       <Button 
           onClick={onCheckout} 
           className="w-full bg-red-600 hover:bg-red-700 text-white h-12 rounded-full font-bold text-lg"
           disabled={isLoading}
       >
           {isLoading ? <Spinner className="text-white" /> : "Place Order"}
       </Button>
    </div>
  );
}
