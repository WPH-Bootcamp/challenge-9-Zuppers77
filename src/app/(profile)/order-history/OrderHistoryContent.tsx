"use client";

import ProfileLayout from "@/components/profile/ProfileLayout";
import OrderFilter from "@/components/order/OrderFilter";
import OrderCard from "@/components/order/OrderCard";
import { useGetMyOrders } from "@/services/queries/order";
import { useGetMyReviews } from "@/services/queries/review";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { Review } from "@/types/entity";

export default function OrderHistoryContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";
  const search = searchParams.get("search") || "";

  const { data: myOrdersData, isLoading: isOrdersLoading } = useGetMyOrders({
    status,
    search,
  });
  const { data: myReviewsData, isLoading: isReviewsLoading } = useGetMyReviews({
    limit: 100,
  });

  const orders = myOrdersData?.data?.orders || [];
  const reviews = myReviewsData?.data?.reviews || [];

  const getReviewForOrder = (transactionId: string) => {
    return reviews.find((r: Review) => r.transactionId === transactionId);
  };

  return (
    <ProfileLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-nunito text-gray-900">
            My Orders
          </h1>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
          <OrderFilter />

          <div className="space-y-4">
            {isOrdersLoading || isReviewsLoading ? (
              <div className="py-12 flex justify-center text-red-600">
                <Spinner className="size-8" />
              </div>
            ) : orders.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              orders.map((order: any) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  review={getReviewForOrder(order.transactionId)}
                />
              ))
            ) : (
              <div className="py-12 text-center text-gray-500">
                <p>No orders found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
