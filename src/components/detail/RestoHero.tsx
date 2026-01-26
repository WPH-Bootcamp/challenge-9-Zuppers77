"use client";

import { RestaurantDetail } from "@/types/entity";
import { Share2, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function RestoHero({
  restaurant,
}: {
  restaurant: RestaurantDetail;
}) {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const images = restaurant.images || ["/assets/images/placeholder.jpg"];

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[300px] md:h-[400px]">
        <div className="md:col-span-2 relative h-full rounded-2xl overflow-hidden group">
          <Image
            src={images[0]}
            alt={`${restaurant.name} 1`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="md:col-span-2 grid grid-rows-2 gap-4 h-full">
          <div className="relative h-full rounded-2xl overflow-hidden group">
            <Image
              src={images[1]}
              alt={`${restaurant.name} 2`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="relative h-full rounded-2xl overflow-hidden group">
              <Image
                src={images[2]}
                alt={`${restaurant.name} 3`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-full rounded-2xl overflow-hidden group">
              <>
                <Image
                  src={images[3]}
                  alt={`${restaurant.name} 4`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </>
            </div>
          </div>
        </div>
      </div>

      {/* Resto Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border">
            <Image
              src={restaurant.logo}
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
              <div className="flex items-center text-yellow-500 font-bold">
                <Star className="w-4 h-4 fill-current mr-1" />
                {restaurant.averageRating || restaurant.star}
              </div>
              <span>•</span>
              <div className="flex items-center">{restaurant.place}</div>
              <span>•</span>
              <div className="flex items-center">{restaurant.distance} km</div>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="gap-2 rounded-full"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>
    </section>
  );
}
