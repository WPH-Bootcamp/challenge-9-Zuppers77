"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { Star } from "lucide-react";
import { selectRestaurantFilters, setFilter, resetFilters } from "@/features/restaurant/restaurantSlice";
import { useDebounce } from "@/hooks/useDebounce";

import { useSearchParams, useRouter } from "next/navigation";

export default function FilterSidebar() {
  const dispatch = useDispatch();
  const filters = useSelector(selectRestaurantFilters);
  const searchParams = useSearchParams();
  const router = useRouter();
  const isInitialMount = useRef(true);

  useEffect(() => {
     const category = searchParams.get("category");
     const range = searchParams.get("range");
     const priceMin = searchParams.get("priceMin");
     const priceMax = searchParams.get("priceMax");
     const rating = searchParams.get("rating");
     
     const urlFilters: Record<string, string | number> = {};
     if (category) urlFilters.category = category;
     if (range) urlFilters.range = Number(range);
     if (priceMin) urlFilters.priceMin = Number(priceMin);
     if (priceMax) urlFilters.priceMax = Number(priceMax);
     if (rating) urlFilters.rating = Number(rating);
     
     if (Object.keys(urlFilters).length > 0) {
         dispatch(setFilter(urlFilters));
     }
     
     isInitialMount.current = false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInitialMount.current) return;
    
    const params = new URLSearchParams();
    
    if (filters.category) params.set("category", filters.category);
    if (filters.range) params.set("range", filters.range.toString());
    if (filters.priceMin) params.set("priceMin", filters.priceMin.toString());
    if (filters.priceMax) params.set("priceMax", filters.priceMax.toString());
    if (filters.rating) params.set("rating", filters.rating.toString());
    
    const queryString = params.toString();
    const newUrl = queryString ? `/restaurants?${queryString}` : "/restaurants";
    
    router.push(newUrl, { scroll: false });
  }, [filters, router]);

  const [minPrice, setMinPrice] = useState(filters.priceMin?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(filters.priceMax?.toString() || "");

  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  useEffect(() => {
      const numMin = debouncedMinPrice ? Number(debouncedMinPrice) : undefined;
      const numMax = debouncedMaxPrice ? Number(debouncedMaxPrice) : undefined;
      
      if (numMin !== filters.priceMin || numMax !== filters.priceMax) {
         dispatch(setFilter({ priceMin: numMin, priceMax: numMax }));
      }
  }, [debouncedMinPrice, debouncedMaxPrice, dispatch, filters.priceMin, filters.priceMax]);

  const toggleRating = (rating: number) => {
    if (filters.rating === rating) {
      dispatch(setFilter({ rating: undefined }));
    } else {
      dispatch(setFilter({ rating }));
    }
  };

  const toggleRange = (range: number) => {
      if (filters.range === range) {
          dispatch(setFilter({ range: undefined }));
      } else {
          dispatch(setFilter({ range }));
      }
  }
  
  const handleResetFilters = () => {
      dispatch(resetFilters());
      setMinPrice("");
      setMaxPrice("");
      router.push("/restaurants", { scroll: false });
  }

  const hasActiveFilters = filters.category || filters.range !== undefined || filters.priceMin || filters.priceMax || filters.rating;

  return (
    <aside className="w-full space-y-8 bg-card p-4 rounded-lg h-fit border">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">Filters</h2>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleResetFilters}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-3"
          >
            Reset
          </Button>
        )}
      </div>
      <div>
        <h3 className="font-bold mb-4">Distance</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
                id="nearby" 
                checked={filters.range === 0.5}
                onCheckedChange={(checked) => {
                    if (checked) {
                        dispatch(setFilter({ range: 0.5 }));
                    } else {
                        dispatch(setFilter({ range: undefined }));
                    }
                }}
            />
            <Label htmlFor="nearby">Nearby</Label>
          </div>
           {[1, 3, 5].map((km) => (
               <div key={km} className="flex items-center space-x-2">
                   <Checkbox 
                       id={`range-${km}`} 
                       checked={filters.range === km}
                       onCheckedChange={() => toggleRange(km)}
                   />
                   <Label htmlFor={`range-${km}`}>Within {km} km</Label>
               </div>
           ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">Price</h3>
        <div className="space-y-4">
             <div className="grid gap-2">
                 <div className="relative">
                   <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">Rp</span>
                   <Input 
                      placeholder="Minimum Price" 
                      className="pl-9" 
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                   />
                 </div>
                 <div className="relative">
                   <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">Rp</span>
                   <Input 
                      placeholder="Maximum Price" 
                      className="pl-9" 
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                   />
                 </div>
             </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">Rating</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center space-x-2">
              <Checkbox 
                id={`rating-${star}`} 
                checked={filters.rating === star}
                onCheckedChange={() => toggleRating(star)}
              />
              <Label htmlFor={`rating-${star}`} className="flex items-center gap-1 cursor-pointer">
                 <div className="flex">
                    {Array.from({length: 5}).map((_, i) => (
                        <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                        />
                    ))}
                 </div>
                 <span className="text-xs text-muted-foreground ml-1">{star}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
