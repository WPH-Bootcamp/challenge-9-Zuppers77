import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthPageContent from "./AuthPageContent";

export default function AuthPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthPageContent />
      </Suspense>
    </AuthLayout>
  );
}
