export const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "Invalid email address";
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === "") return `${fieldName} is required`;
  return null;
};

export const validatePhone = (phone: string): string | null => {
   if (!phone) return "Phone number is required";
  const regex = /^[0-9]+$/;
  if (!regex.test(phone)) return "Phone number must be numeric";
  if (phone.length < 10) return "Phone number is too short";
  return null;
};
