"use client";

import { useGetRestaurantsInfinite } from "@/services/queries/restaurant";
import { RestaurantCard, RestaurantCardSkeleton } from "@/components/home/RestaurantCard";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { selectRestaurantFilters } from "@/features/restaurant/restaurantSlice";
import { Spinner } from "@/components/ui/spinner";

export default function RestaurantList() {
  const filters = useSelector(selectRestaurantFilters);
  const observerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useGetRestaurantsInfinite(filters);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <RestaurantCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <p className="text-destructive font-medium">Failed to load restaurants.</p>
            <Button onClick={() => window.location.reload()} variant="outline">Try Again</Button>
        </div>
    )
  }

  const restaurants = data?.pages.flatMap((page) => page.data.restaurants) || [];
  console.log(restaurants);

  if (restaurants.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-2 border-2 border-dashed rounded-lg border-muted">
              <h3 className="text-xl font-bold">No Restaurants Found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to find what you&apos;re looking for.</p>
          </div>
      )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {restaurants.map((resto) => (
          <RestaurantCard key={`${resto.id}-${resto.name}`} restaurant={resto} />
        ))}
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={observerRef} className="flex justify-center py-8">
        {isFetchingNextPage && (
          <Spinner className="size-8 text-red-600" />
        )}
        {!hasNextPage && restaurants.length > 0 && (
            <p className="text-sm text-muted-foreground font-medium">You&apos;ve reached the end of the list</p>
        )}
      </div>
    </div>
  );
}
