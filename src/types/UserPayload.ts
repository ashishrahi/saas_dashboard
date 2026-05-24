// types/UserPayload.ts

import type { IUser } from "./IUser";

// Create payload
export type CreateUserPayload = Omit<IUser, "_id" | "profileImage"> & {
  profileImage?: File;
};

// Update payload
export type UpdateUserPayload = IUser & {
  profileImage?: File;
};