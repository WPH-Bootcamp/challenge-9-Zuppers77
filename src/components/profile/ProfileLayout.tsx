"use client";

import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logout } from "@/features/auth/authSlice";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, FileText, LogOut } from "lucide-react";
import { AppDispatch } from "@/features/store";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const user = useSelector(selectCurrentUser);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const navItems = [
    {
      label: "Delivery Address",
      href: "/address",
      icon: MapPin,
    },
    {
      label: "My Orders",
      href: "/order-history",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <Link href="/profile" className="flex flex-col items-center text-center space-y-3 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="text-xl bg-red-100 text-red-600">
                             {user?.name?.substring(0, 2).toUpperCase() || "US"}
                        </AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg">{user?.name || "User"}</h3>
                </Link>

                <div className="mt-8 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link key={item.href} href={item.href} className="block">
                                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                                    isActive 
                                    ? "bg-red-50 text-red-600 font-medium" 
                                    : "text-gray-600 hover:bg-gray-50"
                                }`}>
                                    <Icon className={`w-5 h-5 ${isActive ? "fill-current" : ""}`} />
                                    <span>{item.label}</span>
                                </div>
                            </Link>
                        )
                    })}

                    <button 
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors mt-2"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
