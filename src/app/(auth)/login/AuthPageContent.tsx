"use client";

import { useSearchParams, useRouter } from "next/navigation";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");
  const activeTab = tab === "register" || tab === "login" ? tab : "login";

  const onTabChange = (value: string) => {
    router.push(`?tab=${value}`, { scroll: false });
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="flex w-full mb-8 bg-muted rounded-xl p-2 h-auto">
        <TabsTrigger
          value="login"
          className="rounded-lg py-2.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all"
        >
          Sign in
        </TabsTrigger>
        <TabsTrigger
          value="register"
          className="rounded-lg py-2.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all"
        >
          Sign up
        </TabsTrigger>
      </TabsList>

      <TabsContent value="login" className="mt-0">
        <SignInForm />
      </TabsContent>

      <TabsContent value="register" className="mt-0">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  );
}
