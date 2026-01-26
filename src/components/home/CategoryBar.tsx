import Image from "next/image";

const CATEGORIES = [
  { label: "All Restaurant", image: "/assets/images/category-all-restaurant.png" },
  { label: "Nearby", image: "/assets/images/category-location.png" },
  { label: "Discount", image: "/assets/images/category-discount.png" },
  { label: "Best Seller", image: "/assets/images/category-best-sellet.png" },
  { label: "Delivery", image: "/assets/images/category-deliver.png" },
  { label: "Lunch", image: "/assets/images/category-lunch.png" },
];

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetFilters } from "@/features/restaurant/restaurantSlice";

export default function CategoryBar() {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, index) => (
            <button 
              key={index}
              onClick={() => {
                  if (cat.label === "Nearby") {
                      router.push(`/restaurants?`);
                  } else if (cat.label === "All Restaurant") {
                      dispatch(resetFilters());
                      router.push(`/restaurants`); 
                  } else {
                      router.push(`/restaurants?category=${encodeURIComponent(cat.label)}`);
                  }
              }}
              className="flex flex-col items-center gap-3 p-4 rounded-xl transition-colors group cursor-pointer"
            >
              <div className="relative w-12 h-12 md:w-16 md:h-16 shadow-sm rounded-md overflow-hidden bg-white p-2">
                 <Image 
                  src={cat.image} 
                  alt={cat.label} 
                  fill
                  className="object-contain p-2 group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-xs md:text-sm font-medium text-center">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
