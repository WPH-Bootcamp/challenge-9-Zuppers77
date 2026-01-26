import Logo from "@/components/shared/Logo";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex w-full">
      {/* Left Side - Image (Desktop Only) */}
      <div className="hidden lg:block w-1/2 relative bg-muted">
        <Image
          src="/assets/images/auth-image.jpg"
          alt="Auth Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Header Section */}
          <div className="space-y-4">
            <Logo variant="red" />

            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight">
                Welcome Back
              </h1>
              <p className="text-muted-foreground">
                Good to see you again! Let&apos;s eat
              </p>
            </div>
          </div>

          {/* Form Container */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
