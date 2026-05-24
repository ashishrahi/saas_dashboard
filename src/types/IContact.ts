export interface IContact {
  _id: string;

  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;

  isRead: boolean;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}