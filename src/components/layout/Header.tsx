"use client";

import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated, selectCurrentUser } from "@/features/auth/authSlice";
import { fetchCart } from "@/features/cart/cartSlice";
import { selectCartTotalItems } from "@/features/cart/selectors";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag, MapPin, Package, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { AppDispatch } from "@/features/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Header() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const cartTotalItems = useSelector(selectCartTotalItems);
  const dispatch = useDispatch<AppDispatch>();
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white shadow-md" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Logo 
          variant={isScrolled ? "red" : "white"} 
          textClassName={isScrolled ? "text-gray-900" : "text-white"} 
        />

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button 
                variant="ghost" 
                className={`relative hover:bg-transparent p-2 ${
                  isScrolled 
                    ? "text-gray-900 hover:text-red-600" 
                    : "text-white hover:text-primary"
                }`} 
                asChild
              >
                <Link href="/cart">
                  <ShoppingBag strokeWidth={2.5} style={{ width: '24px', height: '24px' }} />
                  {cartTotalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                      {cartTotalItems}
                    </span>
                  )}
                </Link>
              </Button>
              
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`relative h-8 flex items-center gap-4 rounded-full pl-0 pr-3 hover:bg-transparent focus-visible:ring-0 ${
                      isScrolled 
                        ? "text-gray-900" 
                        : "text-white"
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className={`uppercase ${
                        isScrolled ? "bg-red-100 text-red-600" : "bg-white text-primary"
                      }`}>
                        {user?.name?.substring(0, 2) || "US"}
                      </AvatarFallback>
                    </Avatar>
                    <span className={`text-sm font-medium hidden md:block group-hover:text-primary ${isScrolled ? "text-gray-900" : "text-white"}`}>{user?.name || "-"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
                  <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-red-100 text-red-600 uppercase">
                        {user?.name?.substring(0, 2) || "US"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">{user?.name || "-"}</span>
                      <span className="text-xs text-gray-500">{user?.email || "-"}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/order-history" className="cursor-pointer">
                      <Package className="w-4 h-4 mr-2" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/address" className="cursor-pointer">
                      <MapPin className="w-4 h-4 mr-2" />
                      Delivery Address
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                asChild 
                className={`rounded-full ${
                  isScrolled 
                    ? "text-gray-900 border-gray-300 hover:bg-gray-100" 
                    : "text-white border-white hover:bg-white/10"
                }`}
              >
                <Link href="/login?tab=login">Sign In</Link>
              </Button>
              <Button asChild className="rounded-full bg-red-600 text-white hover:bg-red-700">
                <Link href="/login?tab=register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
