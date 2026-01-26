"use client";

import ProfileLayout from "@/components/profile/ProfileLayout";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UpdateProfileSheet from "@/components/profile/UpdateProfileSheet";
import { useState } from "react";
import { Pencil } from "lucide-react";

export default function ProfileContent() {
  const user = useSelector(selectCurrentUser);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  return (
    <ProfileLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-nunito text-gray-900">
            Profile
          </h1>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border flex flex-col items-center max-w-lg mx-auto">
          <div
            className="relative group cursor-pointer mb-6"
            onClick={() => setIsUpdateOpen(true)}
          >
            <Avatar className="w-24 h-24 border-2 border-gray-100 group-hover:border-red-200 transition-colors">
              <AvatarImage
                src={user?.avatar}
                alt={user?.name}
                className="object-cover"
              />
              <AvatarFallback className="text-3xl bg-red-100 text-red-600">
                {user?.name?.substring(0, 2).toUpperCase() || "US"}
              </AvatarFallback>
            </Avatar>
            {/* Overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-semibold">Change</span>
            </div>
            {/* Permanent Pencil Icon */}
            <div className="absolute bottom-0 right-0 bg-white text-red-600 p-2 rounded-full border shadow-md hover:bg-gray-50 transition-colors">
              <Pencil className="w-4 h-4" />
            </div>
          </div>

          <div className="w-full space-y-4 mb-8">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Name</span>
              <span className="font-bold text-gray-900">{user?.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Email</span>
              <span className="font-bold text-gray-900">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Phone Number</span>
              <span className="font-bold text-gray-900">
                {user?.phone || "-"}
              </span>
            </div>
          </div>

          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full h-11 font-bold"
            onClick={() => setIsUpdateOpen(true)}
          >
            Update Profile
          </Button>
        </div>
      </div>

      <UpdateProfileSheet open={isUpdateOpen} onOpenChange={setIsUpdateOpen} />
    </ProfileLayout>
  );
}
