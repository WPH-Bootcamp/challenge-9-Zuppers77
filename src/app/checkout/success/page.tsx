"use client";

import { useSelector } from "react-redux";
import { selectLastTransaction } from "@/features/cart/selectors";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logo from "@/components/shared/Logo";
import { CheckCircle2 } from "lucide-react";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  const transaction = useSelector(selectLastTransaction);
  const router = useRouter();

  useEffect(() => {
    if (!transaction) {
      router.replace("/");
    }
  }, [transaction, router]);

  if (!transaction) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border p-8 text-center space-y-8">
        <div className="flex justify-center">
          <Logo variant="red" />
        </div>

        <div className="space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 fill-current" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Payment Success</h1>
            <p className="text-sm text-gray-500">
              Your payment has been successfully processed.
            </p>
          </div>
        </div>

        <div className="border-t border-b py-6 space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Date</span>
            <span className="font-medium text-gray-900">
              {formatDateTime(transaction.createdAt)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Payment Method</span>
            <span className="font-medium text-gray-900">
              {transaction.paymentMethod}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">
              Price ({transaction.restaurants[0]?.items.length || 0} items)
            </span>
            <span className="font-medium text-gray-900">
              {formatCurrency(transaction.pricing.subtotal)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery Fee</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(transaction.pricing.deliveryFee)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Service Fee</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(transaction.pricing.serviceFee)}
            </span>
          </div>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{formatCurrency(transaction.pricing.totalPrice)}</span>
        </div>

        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full h-11 font-bold"
          onClick={() => router.push("/order-history")}
        >
          See My Orders
        </Button>
      </div>
    </div>
  );
}
