"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { 
  selectVisibleRecommended, 
  setAllRecommended, 
  showMore,
  selectHasMoreRecommended
} from "@/features/restaurant/restaurantSlice";
import { useGetRecommended } from "@/services/queries/restaurant";
import { RestaurantCard, RestaurantCardSkeleton } from "@/components/home/RestaurantCard";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyTitle, EmptyMedia } from "@/components/ui/empty";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function RecommendedSection() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const restaurants = useSelector(selectVisibleRecommended);
  const hasMore = useSelector(selectHasMoreRecommended);
  
  const { data, isLoading } = useGetRecommended();

  useEffect(() => {
    if (data?.data?.recommendations) {
      dispatch(setAllRecommended(data.data.recommendations));
    }
  }, [data, dispatch]);

  const handleShowMore = () => {
    dispatch(showMore());
  };
  
  if (!isAuthenticated) {
     return (
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-2xl font-bold">Recommended</h2>
        </div>
        
        <Empty className="border-border">
          <EmptyMedia variant="icon"><Lock /></EmptyMedia>
          <EmptyTitle>Login Required</EmptyTitle>
          <EmptyDescription>
            Please <Link href="/login?tab=login" className="text-primary underline">login</Link> to view recommended restaurants near you.
          </EmptyDescription>
        </Empty>
      </section>
     );
  }

  return (
    <section className="w-full py-12 max-w-7xl mx-auto px-4 md:px-6 space-y-6">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold">Recommended</h2>
         <Link href="/restaurants" className="text-primary text-sm font-semibold hover:underline">See All</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading && restaurants.length === 0 ? (
          // Initial Loading Skeletons
          Array.from({ length: 8 }).map((_, i) => (
            <RestaurantCardSkeleton key={i} />
          ))
        ) : (
          restaurants.map((resto) => (
             <RestaurantCard key={`${resto.id}-${resto.name}`} restaurant={resto} />
          ))
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-8">
          <Button 
            variant="outline" 
            className="rounded-full px-8"
            onClick={handleShowMore}
          >
            Show More
          </Button>
        </div>
      )}
    </section>
  );
}
