import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  photoURL: z.string().url("Please enter a valid photo URL").optional().or(z.literal("")),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  photoURL: z.string().url("Please enter a valid photo URL").optional().or(z.literal("")),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
