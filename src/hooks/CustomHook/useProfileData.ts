import { useState } from "react"
import type { ProfileData } from "@/types/IProfile"

const defaultProfile: ProfileData = {
  fullName: "Alex Rivera",
  email: "alex.rivera@company.com",
  phone: "+1 (555) 012-3456",
  role: "Administrator",
  department: "Operations",
  employeeId: "EMP-1042",
  status: "active",
  initials: "AR",
  security: {
    passwordLastChanged: "January 12, 2026",
    lastLogin: "May 24, 2026 at 9:42 AM",
    twoFactorEnabled: true,
    loginActivitySummary: "3 sessions this week · Last from New York, US",
  },
  preferences: {
    language: "en",
    timezone: "America/New_York",
    theme: "system",
    notifications: "all",
  },
}

/** Local profile state — replace fetch/update with API calls when ready */
export function useProfileData() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile)

  const updatePreferences = (preferences: Partial<ProfileData["preferences"]>) => {
    setProfile((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...preferences },
    }))
  }

  return { profile, updatePreferences }
}
