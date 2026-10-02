import { ofetch } from "ofetch";

export const apiClient = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});
