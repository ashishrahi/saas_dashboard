export interface GeneralSettings {
  appName: string
  companyName: string
  timezone: string
  language: string
}

export interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  systemAlerts: boolean
  weeklyReports: boolean
}

export interface SecuritySettings {
  twoFactorEnabled: boolean
  sessionTimeout: string
  loginAlerts: boolean
}

export interface AppearanceSettings {
  themeMode: string
  density: string
  layoutPreference: string
}

export interface AppSettings {
  general: GeneralSettings
  notifications: NotificationSettings
  security: SecuritySettings
  appearance: AppearanceSettings
}
