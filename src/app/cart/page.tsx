"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/features/store";
import { 
  fetchCart
} from "@/features/cart/cartSlice";
import { 
  selectCartGroups,
  selectCartLoading 
} from "@/features/cart/selectors";
import RestaurantCartCard from "@/components/cart/RestaurantCartCard";
import { ShoppingBasket } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Empty, EmptyDescription, EmptyTitle, EmptyMedia } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cartGroups = useSelector(selectCartGroups);
  const isLoading = useSelector(selectCartLoading);

  useEffect(() => {
     dispatch(fetchCart());
  }, [dispatch]);

  return (
    <main className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12 flex-1">
             <h1 className="text-2xl font-bold mb-6">My Cart</h1>

             {isLoading && cartGroups.length === 0 ? (
                 <div className="flex h-64 items-center justify-center">
                     <Spinner className="size-8 text-primary" />
                 </div>
             ) : cartGroups.length === 0 ? (
                 <Empty className="border-border bg-card rounded-xl">
                      <EmptyMedia variant="icon"><ShoppingBasket /></EmptyMedia>
                      <EmptyTitle>Your cart is empty</EmptyTitle>
                      <EmptyDescription>
                          Looks like you haven&apos;t added anything to your cart yet.
                      </EmptyDescription>
                      <Button asChild variant="default" className="mt-4 rounded-full">
                          <Link href="/restaurants">Browse Restaurants</Link>
                      </Button>
                 </Empty>
             ) : (
                 <div className="space-y-6">
                     {cartGroups.map(group => (
                         <RestaurantCartCard key={group.restaurant.id} group={group} />
                     ))}
                 </div>
             )}
        </div>

        <Footer />
    </main>
  );
}
