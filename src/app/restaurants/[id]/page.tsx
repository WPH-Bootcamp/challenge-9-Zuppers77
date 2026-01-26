"use client";

import { useGetRestaurantDetail } from "@/services/queries/detail";
import { useParams } from "next/navigation";
import RestoHero from "@/components/detail/RestoHero";
import MenuSection from "@/components/detail/MenuSection";
import ReviewSection from "@/components/detail/ReviewSection";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Spinner } from "@/components/ui/spinner";

export default function RestaurantDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const { data, isLoading, isError } = useGetRestaurantDetail(id);

  if (isLoading) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              <Spinner className="size-10 text-primary" />
          </div>
      );
  }

  if (isError || !data?.data) {
      return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center">
                <p className="text-destructive font-medium">Failed to load restaurant details.</p>
            </div>
            <Footer />
        </div>
      );
  }

  const restaurant = data.data;

  return (
    <main className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12 space-y-12">
             <RestoHero restaurant={restaurant} />
             
             <MenuSection menus={restaurant.menus} />
             
             <ReviewSection 
                restaurantId={id} 
                initialTotal={restaurant.totalReviews} 
                averageRating={restaurant.averageRating || restaurant.star}
             />
        </div>

        <Footer />
    </main>
  );
}
