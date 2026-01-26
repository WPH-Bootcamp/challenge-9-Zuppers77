"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

const STATUS_FILTERS = [
    { label: "All", value: "all" },
    { label: "Preparing", value: "preparing" },
    { label: "On the Way", value: "on_the_way" },
    { label: "Delivered", value: "delivered" },
    { label: "Done", value: "done" },
    { label: "Canceled", value: "canceled" },
];

export default function OrderFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentStatus = searchParams.get("status") || "all";
    const initialSearch = searchParams.get("search") || "";

    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const debouncedSearch = useDebounce(searchTerm, 300);

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== "all") {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        return params.toString();
    };

    const handleStatusChange = (status: string) => {
        router.push(`${pathname}?${createQueryString("status", status)}`);
    };

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (debouncedSearch) {
            params.set("search", debouncedSearch);
        } else {
            params.delete("search");
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, [debouncedSearch, pathname, router, searchParams]);

    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                    className="pl-10 h-11 bg-white border-gray-200"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2">
                <span className="text-sm font-semibold text-gray-700 py-2 mr-2">Status</span>
                {STATUS_FILTERS.map((status) => (
                    <Button
                        key={status.value}
                        variant={currentStatus === status.value ? "default" : "outline"}
                        className={`rounded-full h-8 text-xs font-medium ${
                            currentStatus === status.value 
                            ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700" 
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        }`}
                        onClick={() => handleStatusChange(status.value)}
                    >
                        {status.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}
