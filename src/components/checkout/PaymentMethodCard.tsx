"use client";

import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PAYMENT_METHODS } from "@/constants/payment";

interface PaymentMethodCardProps {
    value: string;
    onValueChange: (value: string) => void;
}

export default function PaymentMethodCard({ value, onValueChange }: PaymentMethodCardProps) {
  return (
    <div className="bg-card p-6 rounded-xl border shadow-sm">
       <h3 className="font-bold text-lg mb-4">Payment Method</h3>
       
       <RadioGroup value={value} onValueChange={onValueChange} className="space-y-4">
          {PAYMENT_METHODS.map((method) => (
             <Label 
               key={method.id} 
               htmlFor={method.id} 
               className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors ${value === method.id ? "border-red-600 bg-red-50/10" : "border-gray-200"}`}
             >
                <div className="flex items-center gap-4">
                    <div className="relative w-12 h-8">
                        <Image 
                           src={`/assets/images/${method.logo}`} 
                           alt={method.name} 
                           fill 
                           className="object-contain" 
                        />
                    </div>
                    <span className="font-medium">{method.name}</span>
                </div>
                <RadioGroupItem value={method.id} id={method.id} className="text-red-600 border-red-600" />
             </Label>
          ))}
       </RadioGroup>
    </div>
  );
}
