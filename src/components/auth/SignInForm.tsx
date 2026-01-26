"use client";

import { useState } from "react";
import { useLogin } from "@/services/queries/auth";
import { validateEmail, validatePassword } from "@/lib/validation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError } from "@/components/ui/field";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useLocalStorage("rememberMe", false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError || undefined,
        password: passwordError || undefined,
      });
      return;
    }

    setErrors({});
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Email Field */}
      <Field>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
        />
        <FieldError>{errors.email}</FieldError>
      </Field>

      {/* Password Field */}
      <Field>
        <div className="relative">
          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
             className={errors.password ? "border-destructive focus-visible:ring-destructive pr-10" : "pr-10"}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
         <FieldError>{errors.password}</FieldError>
      </Field>

      {/* Remember Me */}
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember" 
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
        />
        <Label 
          htmlFor="remember" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember Me
        </Label>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full h-12 rounded-full bg-primary hover:bg-red-700 text-white" disabled={isPending}>
        {isPending ? (
          <>
            <Spinner className="mr-2 h-4 w-4 text-white" />
            Please wait
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}
