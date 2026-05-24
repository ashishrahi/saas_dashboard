export interface IUser {
  _id: string;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}