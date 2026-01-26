import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "red" | "white";
  className?: string;
  textClassName?: string;
  withText?: boolean;
}

export default function Logo({
  variant = "red",
  className,
  textClassName,
  withText = true,
}: LogoProps) {
  const isRed = variant === "red";
  
  const iconSrc = isRed
    ? "/assets/images/logo-icon-red.png"
    : "/assets/images/logo-icon-white.png";

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="relative h-8 w-8 shrink-0">
        <Image
          src={iconSrc}
          alt="Foody Logo"
          fill
          className="object-contain"
        />
      </div>
      {withText && (
        <span className={cn("text-2xl font-extrabold hidden md:block", "text-foreground", textClassName)}>
          Foody
        </span>
      )}
    </Link>
  );
}
