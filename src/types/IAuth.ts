export interface Auth {
  _id: string;
  tenantId?: string;
  email: string;
  role: string;
}

export interface UserProfile {
  _id: string;
  tenantId?: string;
  authId: string;
  name?: string;
  email?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthSessionResponse {
  success: boolean;
  message: string;
  data: {
    auth: Auth;
    user: UserProfile | null;
    token: string;
    refreshToken: string;
    tenantId: string;
  };
}
