"use client";

import { Menu } from "@/types/entity";
import { useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import ShowMore from "@/components/shared/ShowMore";
import MenuCard from "./MenuCard";
import FloatingCartBar from "./FloatingCartBar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { 
    selectDetailMenuCategory, 
    selectDetailMenuLimit, 
    setDetailMenuCategory, 
    showMoreDetailMenus, 
    resetDetailState
} from "@/features/restaurant/restaurantSlice";

const CATEGORIES = ["All Menu", "Food", "Drink"];

export default function MenuSection({ menus }: { menus: Menu[] }) {
  const dispatch = useDispatch();
  const params = useParams();
  const restaurantId = Number(params.id);

  const activeCategory = useSelector(selectDetailMenuCategory);
  const visibleCount = useSelector(selectDetailMenuLimit);

  useEffect(() => {
     return () => {
         dispatch(resetDetailState());
     }
  }, [dispatch]);

  const filteredMenus = useMemo(() => {
     if (activeCategory === "All Menu") return menus;
     return menus.filter(menu => menu.type.toLowerCase() === activeCategory.toLowerCase());
  }, [menus, activeCategory]);

  const visibleMenus = filteredMenus.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMenus.length;

  const handleShowMore = () => {
      dispatch(showMoreDetailMenus());
  };

  const handleCategoryChange = (cat: string) => {
      dispatch(setDetailMenuCategory(cat));
  };

  return (
    <section className="w-full space-y-6 pb-24">
       <h2 className="text-2xl font-bold">Menu</h2>
       
       {/* Category Tabs */}
       <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
           {CATEGORIES.map(cat => (
               <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                      "px-6 py-2 rounded-full text-sm font-semibold transition-colors border whitespace-nowrap",
                      activeCategory === cat 
                        ? "bg-red-50 text-red-500 border-red-200" 
                        : "bg-white text-muted-foreground border-border hover:bg-gray-50"
                  )}
               >
                 {cat}
               </button>
           ))}
       </div>

       {/* Menu Grid */}
       {visibleMenus.length > 0 ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visibleMenus.map(menu => (
                    <MenuCard key={menu.id} menu={menu} />
                ))}
           </div>
       ) : (
           <div className="text-center py-12 text-muted-foreground">
               No items found in this category.
           </div>
       )}

       {/* Show More */}
       {hasMore && (
           <ShowMore onClick={handleShowMore} />
       )}

       {/* Floating Cart Bar */}
       <FloatingCartBar restaurantId={restaurantId} />
    </section>
  );
}
