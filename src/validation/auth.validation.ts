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
      "Enter a valid phone number",
    ),
  address: z.string().trim().min(10, "Please enter your full address"),
  areaId: z.string().min(1, "Please select an area"),
  packageId: z.string().min(1, "Please select a package"),
});

export type TConnectionRequestValues = z.infer<typeof ConnectionRequestSchema>;


export const CreateCollectorSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine(
      (value) => BD_PHONE_REGEX.test(value.replace(/[\s-]/g, "")),
      "Enter a valid phone number",
    ),
});

export type TCreateCollectorPayload = z.infer<typeof CreateCollectorSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email("Enter a valid email address")),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;


const OTP_LENGTH = 6;

export const resetPasswordSchema = z.object({
  otp: z
    .string()
    .min(1, "Verification code is required")
    .regex(/^\d+$/, "Code must contain only numbers")
    .length(OTP_LENGTH, `Enter the ${OTP_LENGTH}-digit code we sent to your email`),
  password: z
    .string()
    .min(1, "New password is required")
    .min(8, "Password must be at least 8 characters"),
});
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;


export const CreatePackageSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters"),
  speed: z.string().trim().min(2, "Full name must be at least 2 characters"),
  price: z.string().min(1, "Price must be at least 100 BDT"),
});

export type TCreatePackagePayload = z.infer<typeof CreatePackageSchema>;


export const CreateAreaSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters"),
  collectorId: z.string().min(1, "Please select a collector"),
});

export type TCreateAreaPayload = z.infer<typeof CreateAreaSchema>;