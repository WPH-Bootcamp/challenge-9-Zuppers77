"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface ShowMoreProps {
  onClick: () => void;
  isLoading?: boolean;
}

export default function ShowMore({ onClick, isLoading }: ShowMoreProps) {
  return (
    <div className="flex justify-center mt-8">
        <Button 
            variant="outline" 
            className="rounded-full px-8 border-gray-300 text-gray-600 hover:bg-gray-50"
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <Spinner className="mr-2" />
                    Loading...
                </>
            ) : (
                "Show More"
            )}
        </Button>
    </div>
  );
}
