"use client";
import { Search, Star, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchRestaurants } from "@/services/queries/restaurant";
import Link from "next/link";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { Restaurant } from "@/types/entity";

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useDebounce(searchTerm, 300);
  const { data: searchResults, isFetching } = useSearchRestaurants(debouncedSearch);

  const handleSearch = () => {
    setIsFocused(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const restaurants = searchResults?.data?.restaurants || [];
  const showDropdown = isFocused && (searchTerm.length > 0);

  return (
    <section className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/images/hero-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4 text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Explore Culinary Experiences
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            Search and refine your choice to discover the perfect restaurant.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto" ref={dropdownRef}>
          <div className="relative flex items-center w-full h-12 rounded-full focus-within:ring-2 focus-within:ring-primary bg-white overflow-hidden shadow-lg px-4 z-20">
             <Search className="h-5 w-5 text-muted-foreground mr-2 cursor-pointer" onClick={handleSearch} />
             <input 
              type="text"
              placeholder="Search for restaurants..."
              className="w-full text-sm outline-none bg-transparent placeholder:text-muted-foreground text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
             />
             {isFetching && <Spinner className="ml-2 text-muted-foreground" />}
          </div>

          {/* Search Suggestions Dropdown */}
          {showDropdown && (
            <div className="absolute top-14 left-0 right-0 bg-white rounded-2xl shadow-xl overflow-hidden z-10 text-left border border-gray-100 max-h-[400px] overflow-y-auto">
                {isFetching ? (
                    <div className="p-4 text-center text-gray-500 flex items-center justify-center gap-2">
                        <Spinner /> Searching...
                    </div>
                ) : restaurants.length > 0 ? (
                    <div className="py-2">
                        <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Restaurants</p>
                        {restaurants.map((place: Restaurant) => (
                            <Link 
                                key={place.id} 
                                href={`/restaurants/${place.id}`}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                                onClick={() => setIsFocused(false)}
                            >
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                    <Image 
                                        src={place.images?.[0] || "/assets/images/placeholder-food.jpg"} 
                                        alt={place.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 truncate">{place.name}</h4>
                                    <div className="flex items-center text-xs text-gray-500 gap-2">
                                        <div className="flex items-center text-yellow-500">
                                            <Star className="w-3 h-3 fill-current mr-0.5" />
                                            <span>{place.star || "NEW"}</span>
                                        </div>
                                        <span>•</span>
                                        <div className="flex items-center truncate">
                                            <MapPin className="w-3 h-3 mr-0.5" />
                                            <span className="truncate">{place.place}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-500">
                        No results found for &quot;{searchTerm}&quot;
                    </div>
                )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
