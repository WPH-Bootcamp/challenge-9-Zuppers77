"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useUpdateProfile } from "@/services/queries/auth";
import { Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";

interface UpdateProfileSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function UpdateProfileSheet({ open, onOpenChange }: UpdateProfileSheetProps) {
    const user = useSelector(selectCurrentUser);
    const { mutate: updateProfile, isPending } = useUpdateProfile();

    const [name, setName] = useState(user?.name || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [email] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(user?.avatar || null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
             const file = e.target.files[0];
             setAvatarFile(file);
             setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);
        if (password) {
            formData.append("password", password);
        }
        if (avatarFile) {
            formData.append("avatar", avatarFile);
        }

        updateProfile(formData, {
            onSuccess: () => onOpenChange(false)
        });
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader className="mb-6">
                    <SheetTitle className="text-xl font-bold font-nunito">Update Profile</SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group cursor-pointer">
                            <Avatar className="w-24 h-24 border-2 border-gray-100">
                                <AvatarImage src={previewUrl || ""} className="object-cover" />
                                <AvatarFallback className="text-2xl bg-gray-100 text-gray-400">
                                    {name?.substring(0, 2).toUpperCase() || "US"}
                                </AvatarFallback>
                            </Avatar>
                            <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="w-6 h-6" />
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>
                        </div>
                        <p className="text-xs text-gray-500">Tap to change photo</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        
                        <div className="space-y-2">
                             <Label htmlFor="email" className="text-gray-500">Email (Read Only)</Label>
                             <Input id="email" value={email} disabled className="bg-gray-50 text-gray-500" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                             <Label htmlFor="password">Password (Optional)</Label>
                             <Input 
                                id="password" 
                                type="password" 
                                placeholder="Leave blank to keep same"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                             />
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white h-11 rounded-full font-bold" disabled={isPending}>
                        {isPending ? <Spinner className="text-white"/> : "Save Changes"}
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}
