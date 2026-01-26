"use client";

import { useGetRestaurantReviewsInfinite } from "@/services/queries/detail";
import { Star } from "lucide-react";
import Image from "next/image";
import ShowMore from "@/components/shared/ShowMore";
import { formatDateTime } from "@/lib/utils";

export default function ReviewSection({
  restaurantId,
  initialTotal,
  averageRating,
}: {
  restaurantId: string;
  initialTotal: number;
  averageRating: number;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetRestaurantReviewsInfinite(restaurantId);

  const reviews = data?.pages.flatMap((page) => page.data.reviews) || [];

  return (
    <section className="space-y-6 pt-8 border-t">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Review</h2>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-lg">{averageRating}</span>
          <span className="text-muted-foreground font-medium">
            ({initialTotal} Ulasan)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 border rounded-xl bg-card space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                <Image
                  src={
                    review.user.avatar ||
                    "/assets/images/placeholder-avatar.jpg"
                  }
                  alt={review.user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm">{review.user.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {formatDateTime(review.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.star ? "fill-current" : "text-gray-200"}`}
                />
              ))}
            </div>

            <p className="text-sm leading-relaxed text-gray-700">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <ShowMore
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
        />
      )}
    </section>
  );
}
