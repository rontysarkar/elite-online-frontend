export function normalizePhone(phone: string): string {
  const digits = phone.replace(/[\s-]/g, "").replace(/^\+/, "");
  return digits.startsWith("88") ? `+${digits}` : `+88${digits}`;
}


export function getErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return "Invalid value";
}