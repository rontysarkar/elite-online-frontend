export type ProfileRole = "ADMIN" | "COLLECTOR" | "CUSTOMER";

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: ProfileRole;
  createdAt: string;
  area: {
    name: string;
  }[];
  customer: {
    address: string;
    package: {
      name: string;
      speed: string;
      price: string;
    };
    area: {
      name: string;
    };
  } | null;
}