import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Restaurant } from "@/types/entity";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

import Link from "next/link";

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <Card className="overflow-hidden shadow-sm border border-border/30 bg-white cursor-pointer hover:shadow-sm transition-shadow p-3">
        <div className="flex gap-3 items-center">
          <div className="relative w-21 h-25 rounded-lg overflow-hidden shrink-0">
            <Image
              src={restaurant.images?.[0] || "/assets/images/placeholder.jpg"}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
          </div>
          
          <CardContent className="p-0 space-y-1 flex-1 min-w-0">
            <h3 className="font-bold truncate">{restaurant.name}</h3>
            
            <div className="flex items-center gap-1 text-sm font-medium">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span>{restaurant.star || 0}</span>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{restaurant.place || "Jakarta Selatan"}</span>
              <span className="text-xs">•</span>
              <span>{restaurant.distance || "0 km"}</span>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}

export function RestaurantCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-4/3 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
