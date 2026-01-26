"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Package2, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ReviewModal from "@/components/review/ReviewModal";

interface Transaction {
    id: number;
    transactionId: string;
    status: string;
    paymentMethod: string;
    pricing: {
        totalPrice: number;
    };
    restaurants: {
        restaurant: {
            id: number;
            name: string;
            logo: string;
        };
        items: {
            menuId: number;
            menuName: string;
            price: number;
            quantity: number;
            image: string;
        }[];
    }[];
}

interface Review {
    id: number;
    star: number;
    comment: string;
}

interface OrderCardProps {
    order: Transaction;
    review?: Review;
}

export default function OrderCard({ order, review }: OrderCardProps) {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const restaurantGroup = order.restaurants[0];
    const restaurant = restaurantGroup.restaurant;
    const firstItem = restaurantGroup.items[0];
    const otherItemsCount = restaurantGroup.items.length - 1;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-4">
            {/* Header: Restaurant Info & Status */}
            <div className="flex items-center justify-between">
                <Link href={`/restaurants/${restaurant.id}`} className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                         {restaurant.logo ? (
                            <Image 
                                src={restaurant.logo} 
                                alt={restaurant.name} 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform"
                            />
                         ) : (
                             <div className="flex items-center justify-center h-full text-gray-400">
                                 <Package2 className="w-5 h-5" />
                             </div>
                         )}
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">{restaurant.name}</h3>
                </Link>
            </div>

            <div className="border-b border-gray-100 pb-4"></div>

            {/* Item Preview */}
            <div className="flex gap-4">
                 <Link href={`/restaurants/${restaurant.id}`} className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 group">
                    {firstItem.image ? (
                        <Image 
                            src={firstItem.image} 
                            alt={firstItem.menuName} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            <Package2 className="w-8 h-8" />
                        </div>
                    )}
                 </Link>
                 
                 <div className="flex-1 space-y-1">
                     <Link href={`/restaurants/${restaurant.id}`} className="font-medium text-gray-900 line-clamp-1 hover:text-red-600 transition-colors">
                        {firstItem.menuName}
                     </Link>
                     <p className="text-sm text-gray-500">
                         {firstItem.quantity} x {formatCurrency(firstItem.price)}
                     </p>
                     {otherItemsCount > 0 && (
                         <p className="text-xs text-gray-400">+{otherItemsCount} other items</p>
                     )}
                 </div>
            </div>

             {/* Review Display (if exists) */}
             {review && (
                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                                key={star} 
                                className={`w-4 h-4 ${review.star >= star ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} 
                            />
                        ))}
                        <span className="text-sm font-semibold ml-2">{review.star}.0</span>
                    </div>
                    {review.comment && (
                        <p className="text-sm text-gray-600 italic">&quot;{review.comment}&quot;</p>
                    )}
                </div>
            )}

            {/* Footer: Total & Actions */}
            <div className="flex items-center justify-between pt-2">
                <div className="space-y-1">
                    <span className="text-xs text-gray-500">Total</span>
                    <p className="font-bold text-gray-900">{formatCurrency(order.pricing.totalPrice)}</p>
                </div>

                {order.status === "done" && (
                    <Button 
                        className={`rounded-full h-9 px-6 font-medium ${
                            review 
                            ? "bg-white border-2 border-red-600 text-red-600 hover:bg-red-50" 
                            : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                        onClick={() => setIsReviewModalOpen(true)}
                    >
                        {review ? "Edit Review" : "Give Review"}
                    </Button>
                )}
                 {order.status !== "done" && (
                    <Button variant="outline" className="rounded-full h-9 px-6 font-medium text-gray-600">
                        Detail
                    </Button>
                )}
            </div>

            <ReviewModal 
                open={isReviewModalOpen} 
                onOpenChange={setIsReviewModalOpen}
                transactionId={order.transactionId}
                restaurantId={restaurant.id}
                menuIds={restaurantGroup.items.map(item => {
                    return (item as { menuId?: number }).menuId || 0; 
                })}
                existingReview={review}
            />
        </div>
    );
}
