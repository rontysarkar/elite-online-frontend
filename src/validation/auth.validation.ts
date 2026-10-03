import z from "zod";


export const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});




const BD_PHONE_REGEX = /^(?:\+?88)?01[3-9]\d{8}$/;

export const ConnectionRequestSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine(
      (value) => BD_PHONE_REGEX.test(value.replace(/[\s-]/g, "")),
      "Enter a valid phone number (e.g. 01700-000001)",
    ),
  address: z.string().trim().min(10, "Please enter your full address"),
  areaId: z.string().min(1, "Please select an area"),
  packageId: z.string().min(1, "Please select a package"),
});

export type ConnectionRequestValues = z.infer<typeof ConnectionRequestSchema>;