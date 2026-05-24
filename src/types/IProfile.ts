export interface ProfileSecurity {
  passwordLastChanged: string
  lastLogin: string
  twoFactorEnabled: boolean
  loginActivitySummary: string
}

export interface ProfilePreferences {
  language: string
  timezone: string
  theme: string
  notifications: string
}

export interface ProfileData {
  fullName: string
  email: string
  phone: string
  role: string
  department: string
  employeeId?: string
  status: string
  initials: string
  security: ProfileSecurity
  preferences: ProfilePreferences
}
