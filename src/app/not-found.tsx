"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="space-y-6 flex flex-col items-center">
        {/* Playful Illustration Placeholder or Icon */}
        <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mb-4">
             <Ghost className="w-16 h-16 text-red-500" />
        </div>

        <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-gray-900 font-nunito">Page Not Found</h1>
            <p className="text-gray-500 max-w-sm mx-auto">
                We couldn&apos;t find the page you were looking for. It may have been moved or deleted.
            </p>
        </div>
        
        <Button asChild className="rounded-full bg-red-600 hover:bg-red-700 text-white h-11 px-8 font-bold">
            <Link href="/">
                <MoveLeft className="mr-2 w-4 h-4"/>
                Back to Home
            </Link>
        </Button>
      </div>
    </div>
  );
}
