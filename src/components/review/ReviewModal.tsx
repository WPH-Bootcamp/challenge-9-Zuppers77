"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Star, Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useSubmitReview, useUpdateReview, useDeleteReview } from "@/services/queries/review";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ReviewModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transactionId: string;
    restaurantId: number;
    menuIds: number[];
    existingReview?: {
        id: number;
        star: number;
        comment: string;
    } | null;
}

export default function ReviewModal({
    open,
    onOpenChange,
    transactionId,
    restaurantId,
    menuIds,
    existingReview
}: ReviewModalProps) {
    const [rating, setRating] = useState(existingReview?.star || 0);
    const [comment, setComment] = useState(existingReview?.comment || "");
    const [hoverRating, setHoverRating] = useState(0);
    
    const { mutate: submitReview, isPending: isSubmitPending } = useSubmitReview();
    const { mutate: updateReview, isPending: isUpdatePending } = useUpdateReview();
    const { mutate: deleteReview, isPending: isDeletePending } = useDeleteReview();

    const isPending = isSubmitPending || isUpdatePending || isDeletePending;

    const handleSubmit = () => {
        if (rating === 0) return; 

        if (existingReview) {
            updateReview({
                id: existingReview.id,
                data: { star: rating, comment }
            }, {
                onSuccess: () => onOpenChange(false)
            });
        } else {
            submitReview({
                transactionId,
                restaurantId,
                star: rating,
                comment,
                menuIds
            }, {
                onSuccess: () => onOpenChange(false)
            });
        }
    };

    const handleDelete = () => {
        if (!existingReview) return;
        deleteReview(existingReview.id, {
            onSuccess: () => onOpenChange(false)
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold font-nunito">
                        {existingReview ? "Edit Review" : "Give Review"}
                    </DialogTitle>
                </DialogHeader>
                
                <div className="flex flex-col items-center space-y-6 py-4">
                    <div className="text-center space-y-2">
                        <label className="text-sm font-bold text-gray-900">Give Rating</label>
                        <div className="flex gap-2">
                             {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="focus:outline-none transition-transform hover:scale-110"
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                >
                                    <Star 
                                        className={`w-8 h-8 ${
                                            (hoverRating || rating) >= star 
                                            ? "fill-yellow-400 text-yellow-400" 
                                            : "fill-gray-200 text-gray-200"
                                        }`} 
                                    />
                                </button>
                             ))}
                        </div>
                    </div>

                    <div className="w-full space-y-2">
                        <Textarea 
                            placeholder="Please share your thoughts about our service!"
                            className="min-h-[120px] resize-none border-gray-200 focus:border-red-500 bg-gray-50"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <div className="w-full space-y-3">
                        <Button 
                            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full h-11 font-bold"
                            disabled={rating === 0 || isPending}
                            onClick={handleSubmit}
                        >
                            {isPending ? <Spinner className="text-white" /> : (existingReview ? "Update Review" : "Send")}
                        </Button>

                        {existingReview && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button 
                                        variant="outline"
                                        className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full h-11 font-bold"
                                        disabled={isPending}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete Review
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your review.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
