import { useState } from "react"
import type { AppSettings } from "@/types/ISettings"

const defaultSettings: AppSettings = {
  general: {
    appName: "Admin Console",
    companyName: "Acme Corporation",
    timezone: "America/New_York",
    language: "en",
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: false,
    systemAlerts: true,
    weeklyReports: true,
  },
  security: {
    twoFactorEnabled: false,
    sessionTimeout: "30",
    loginAlerts: true,
  },
  appearance: {
    themeMode: "system",
    density: "comfortable",
    layoutPreference: "default",
  },
}

/** Local settings state — replace with API persistence when ready */
export function useSettingsData() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)

  const updateGeneral = (general: Partial<AppSettings["general"]>) => {
    setSettings((prev) => ({ ...prev, general: { ...prev.general, ...general } }))
  }

  const updateNotifications = (notifications: Partial<AppSettings["notifications"]>) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, ...notifications },
    }))
  }

  const updateSecurity = (security: Partial<AppSettings["security"]>) => {
    setSettings((prev) => ({ ...prev, security: { ...prev.security, ...security } }))
  }

  const updateAppearance = (appearance: Partial<AppSettings["appearance"]>) => {
    setSettings((prev) => ({
      ...prev,
      appearance: { ...prev.appearance, ...appearance },
    }))
  }

  return {
    settings,
    updateGeneral,
    updateNotifications,
    updateSecurity,
    updateAppearance,
  }
}
