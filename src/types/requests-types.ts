export interface ConnectionRequestResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  emailVerified: boolean;
  createdAt: string;
  area: {
    name: string;
  };
  package: {
    name: string;
    speed: string;
    price: string;
  };
}