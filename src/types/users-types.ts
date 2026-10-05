import { PaginationMeta } from "./common.type";


export type UserRole = "ADMIN" | "COLLECTOR" | "CUSTOMER";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}



export interface UsersReport {
  totalUsers: number;
  activeUsers: number;
  deletedUsers: number;
  users: User[];
  meta: PaginationMeta;
}

export interface UsersUrlParams {
  page?: string;
  searchTerm?: string;
  role?: string;
}

export interface UsersQuery {
	searchTerm?: string;
	page?: string;
	limit?: string;
	sortOrder?: string;
	sortBy?: string;

	[key: string]: any;
}