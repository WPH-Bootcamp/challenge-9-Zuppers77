"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { checkoutApi } from "@/features/cart/cartSlice";
import {
  selectCartGroups,
  selectCartGroupById,
  selectCheckoutCalculations,
} from "@/features/cart/selectors";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { AppDispatch, RootState } from "@/features/store";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import DeliveryAddressCard from "@/components/checkout/DeliveryAddressCard";
import CheckoutItemCard from "@/components/checkout/CheckoutItemCard";
import PaymentMethodCard from "@/components/checkout/PaymentMethodCard";
import OrderSummaryCard from "@/components/checkout/OrderSummaryCard";

export default function CheckoutContent() {
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const restaurantId = Number(params.get("restaurantId"));
  const user = useSelector(selectCurrentUser);
  const cartGroups = useSelector(selectCartGroups);

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(
    "BNI Bank Negara Indonesia",
  );
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const group = useSelector((state: RootState) =>
    selectCartGroupById(state, restaurantId),
  );
  const calculations = useSelector((state: RootState) =>
    selectCheckoutCalculations(state, restaurantId),
  );

  useEffect(() => {
    if (!restaurantId || (!group && cartGroups.length > 0)) {
      router.push("/cart");
    }
  }, [restaurantId, group, cartGroups, router]);

  if (!restaurantId || !group || !calculations) {
    if (!restaurantId) {
      return (
        <div className="container mx-auto px-4 py-8 text-center max-w-4xl">
          <h1 className="text-2xl font-bold mb-4">Invalid Checkout Session</h1>
          <Button onClick={() => router.push("/cart")}>Back to Cart</Button>
        </div>
      );
    }
    return (
      <div className="container mx-auto px-4 py-8 text-center max-w-4xl pt-20">
        <Spinner className="size-8 mx-auto mb-4 text-red-600" />
        <p>Loading your checkout...</p>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!deliveryAddress.trim()) {
      toast.error("Please provide a delivery address.");
      return;
    }

    setIsProcessing(true);
    try {
      await dispatch(
        checkoutApi({
          restaurantId,
          deliveryAddress,
          paymentMethod,
        }),
      ).unwrap();

      toast.success("Order placed successfully!");
      router.push("/checkout/success");
    } catch {
      // Toast handled in thunk
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Address, Items, Payment */}
          <div className="lg:col-span-2 space-y-6">
            <DeliveryAddressCard
              user={user}
              address={deliveryAddress}
              onAddressChange={setDeliveryAddress}
            />

            <CheckoutItemCard
              items={group.items}
              restaurantName={group.restaurant.name}
            />

            <PaymentMethodCard
              value={paymentMethod}
              onValueChange={setPaymentMethod}
            />
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            <OrderSummaryCard
              subtotal={calculations.subtotal}
              totalItems={calculations.totalItems}
              deliveryFee={calculations.deliveryFee}
              serviceFee={calculations.serviceFee}
              onCheckout={handleCheckout}
              isLoading={isProcessing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
