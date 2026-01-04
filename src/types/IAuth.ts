export interface Auth {
  _id: string;
  email: string;
  role: string;
}

export interface UserProfile {
  _id: string;
  authId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    auth: Auth;
    token: string;
    refreshToken: string;
    userProfile: UserProfile;
  };
}
