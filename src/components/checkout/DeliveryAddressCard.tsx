"use client";

import { User } from "@/types/entity";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Label } from "@/components/ui/label";

interface DeliveryAddressCardProps {
    user: User | null;
    address: string;
    onAddressChange: (address: string) => void;
}

export default function DeliveryAddressCard({ user, address, onAddressChange }: DeliveryAddressCardProps) {
  const [isEditing, setIsEditing] = useState(!address);
  const phone = user?.phone || "";

  return (
    <div className="bg-card p-6 rounded-xl border shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-red-600 fill-current" />
        <h3 className="font-bold text-lg">Delivery Address</h3>
      </div>

      <div className="space-y-4">
          {!isEditing ? (
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-medium text-gray-900 whitespace-pre-wrap">{address}</p>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                     <Phone className="w-4 h-4" />
                     <span>{phone || "No phone number linked"}</span>
                  </div>
                </div>

                <Button 
                    variant="outline" 
                    className="rounded-full px-6 h-9 font-medium text-sm"
                    onClick={() => setIsEditing(true)}
                >
                    Change
                </Button>
              </div>
          ) : (
              <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address</Label>
                    <Textarea 
                        id="address"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Ex: Jl. Sudirman No. 25, Jakarta Pusat"
                        value={address}
                        onChange={(e) => onAddressChange(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                       <Button 
                          size="sm"
                          onClick={() => setIsEditing(false)}
                          disabled={!address.trim()}
                        >
                          Save Address
                        </Button>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
}
