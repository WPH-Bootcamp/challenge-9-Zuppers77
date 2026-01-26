"use client";

import { useState } from "react";
import { useRegister } from "@/services/queries/auth";
import { validateEmail, validatePassword, validatePhone, validateRequired } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    phone?: string; 
    password?: string;
    confirmPassword?: string;
  }>({});

  const { mutate: register, isPending } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nameError = validateRequired(name, "Name");
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);
    let confirmError = null;

    if (confirmPassword !== password) {
      confirmError = "Passwords do not match";
    }

    if (nameError || emailError || phoneError || passwordError || confirmError) {
      setErrors({
        name: nameError || undefined,
        email: emailError || undefined,
        phone: phoneError || undefined,
        password: passwordError || undefined,
        confirmPassword: confirmError || undefined,
      });
      return;
    }

    setErrors({});
    register({ name, email, phone, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Name Field */}
      <Field>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
        />
        <FieldError>{errors.name}</FieldError>
      </Field>

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

      {/* Phone Field */}
      <Field>
        <Input
          placeholder="Number Phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
        />
         <FieldError>{errors.phone}</FieldError>
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

       {/* Confirm Password Field */}
       <Field>
        <div className="relative">
          <Input
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? "border-destructive focus-visible:ring-destructive pr-10" : "pr-10"}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <FieldError>{errors.confirmPassword}</FieldError>
      </Field>

      {/* Submit Button */}
      <Button type="submit" className="w-full h-12 rounded-full bg-primary hover:bg-red-700 text-white" disabled={isPending}>
        {isPending ? (
          <>
            <Spinner className="mr-2 h-4 w-4 text-white" />
            Please wait
          </>
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
}
