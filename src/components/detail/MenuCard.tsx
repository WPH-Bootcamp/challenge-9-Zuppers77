"use client";

import { Menu } from "@/types/entity";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import MenuAction from "@/components/detail/MenuAction";

interface MenuCardProps {
  menu: Menu;
  onClick?: () => void;
}

export default function MenuCard({ menu }: MenuCardProps) {
  return (
    <div className="rounded-2xl border bg-card overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-square w-full bg-muted">
        <Image
          src={menu.image}
          alt={menu.foodName}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex items-center justify-between p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-sm line-clamp-1">
            {menu.foodName}
          </h3>
          <p className="font-bold text-lg">{formatCurrency(menu.price)}</p>
        </div>

        <MenuAction menu={menu} />
      </div>
    </div>
  );
}
