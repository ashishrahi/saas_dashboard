export interface ISubCategory {
  _id: string;
  name: string;
  description?: string;
  // In responses we get populated category object; in requests we send just the id string
  categoryId: string | { _id: string; name: string };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

