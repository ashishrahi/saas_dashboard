export interface IPlan {
  _id: string;
  name: string;
  price?: number;
  period?: string;
  description?: string;
  features: string[];
  popular: boolean;
  isActive: boolean;
  buttonText: string;
  isCustom: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Payloads
export type CreatePlanPayload = Omit<IPlan, "_id" | "createdAt" | "updatedAt">;

export type UpdatePlanPayload = {
  id: string;
  data: CreatePlanPayload;
};