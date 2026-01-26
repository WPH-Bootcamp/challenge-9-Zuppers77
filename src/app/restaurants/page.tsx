import FilterSidebar from "@/components/restaurant/FilterSidebar";
import RestaurantList from "@/components/restaurant/RestaurantList";
import Header from "@/components/layout/Header";

import Footer from "@/components/layout/Footer";

export default function RestaurantsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
       <Header /> 
       
       <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12 flex-1">
          <h1 className="text-3xl font-bold mb-8">All Restaurant</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
             {/* Sidebar */}
             <div className="w-full md:w-72 shrink-0">
                <FilterSidebar />
             </div>
             
             {/* Main List */}
             <div className="flex-1">
                <RestaurantList />
             </div>
          </div>
       </div>

       <Footer />
    </main>
  );
}
