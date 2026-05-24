import { AlertTriangle, KeyRound, LogOut, Trash2 } from "lucide-react"
import { AppContainer } from "@/AppComponent/AppContainer"
import { PageHeader } from "@/components/design-system/page-header"
import { FormField } from "@/components/design-system/form-field"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSettingsData } from "@/hooks/CustomHook/useSettingsData"
import { cn } from "@/lib/utils"
import { bg } from "@/lib/theme/colors"
import { spacing } from "@/lib/theme/spacing"
import { text } from "@/lib/theme/typography"

interface SettingRowProps {
  id: string
  label: string
  description?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

function SettingRow({ id, label, description, checked, onCheckedChange }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-1">
        <Label htmlFor={id} className={text.label}>
          {label}
        </Label>
        {description && <p className={text.caption}>{description}</p>}
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}

export default function SettingsPage() {
  const {
    settings,
    updateGeneral,
    updateNotifications,
    updateSecurity,
    updateAppearance,
  } = useSettingsData()

  const handleChangePassword = () => {
    console.log("Change password")
  }

  const handleLogoutAllSessions = () => {
    console.log("Logout all sessions")
  }

  const handleDeleteAccount = () => {
    console.log("Delete account")
  }

  return (
    <AppContainer>
      <div className={cn("flex flex-col", spacing[6])}>
        <PageHeader
          title="Settings"
          description="Configure application preferences, notifications, security, and appearance."
        />

        <Tabs defaultValue="general" className={spacing[6]}>
          <TabsList className="h-auto w-full flex-wrap justify-start">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic application and organization configuration.</CardDescription>
              </CardHeader>
              <CardContent className={cn("grid grid-cols-1", spacing[4], "md:grid-cols-2")}>
                <FormField label="App Name" htmlFor="appName">
                  <Input
                    id="appName"
                    value={settings.general.appName}
                    onChange={(e) => updateGeneral({ appName: e.target.value })}
                  />
                </FormField>
                <FormField label="Company Name" htmlFor="companyName">
                  <Input
                    id="companyName"
                    value={settings.general.companyName}
                    onChange={(e) => updateGeneral({ companyName: e.target.value })}
                  />
                </FormField>
                <FormField label="Timezone" htmlFor="settingsTimezone">
                  <Select
                    value={settings.general.timezone}
                    onValueChange={(value) => updateGeneral({ timezone: value })}
                  >
                    <SelectTrigger id="settingsTimezone" className="w-full">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Language" htmlFor="settingsLanguage">
                  <Select
                    value={settings.general.language}
                    onValueChange={(value) => updateGeneral({ language: value })}
                  >
                    <SelectTrigger id="settingsLanguage" className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Choose how and when you receive updates.</CardDescription>
              </CardHeader>
              <CardContent className={cn("flex flex-col", spacing[5])}>
                <SettingRow
                  id="emailNotifications"
                  label="Email notifications"
                  description="Receive updates and alerts via email."
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) =>
                    updateNotifications({ emailNotifications: checked })
                  }
                />
                <Separator />
                <SettingRow
                  id="pushNotifications"
                  label="Push notifications"
                  description="Get real-time alerts in your browser."
                  checked={settings.notifications.pushNotifications}
                  onCheckedChange={(checked) =>
                    updateNotifications({ pushNotifications: checked })
                  }
                />
                <Separator />
                <SettingRow
                  id="systemAlerts"
                  label="System alerts"
                  description="Critical system and security notifications."
                  checked={settings.notifications.systemAlerts}
                  onCheckedChange={(checked) => updateNotifications({ systemAlerts: checked })}
                />
                <Separator />
                <SettingRow
                  id="weeklyReports"
                  label="Weekly reports"
                  description="Summary digest delivered every Monday."
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(checked) => updateNotifications({ weeklyReports: checked })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage authentication and session preferences.</CardDescription>
              </CardHeader>
              <CardContent className={cn("flex flex-col", spacing[5])}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <p className={text.label}>Password</p>
                    <p className={text.caption}>Update your password to keep your account secure.</p>
                  </div>
                  <Button variant="outline" onClick={handleChangePassword}>
                    <KeyRound className="size-4" />
                    Change password
                  </Button>
                </div>
                <Separator />
                <SettingRow
                  id="twoFactorEnabled"
                  label="Two-factor authentication"
                  description="Add an extra layer of security to your account."
                  checked={settings.security.twoFactorEnabled}
                  onCheckedChange={(checked) =>
                    updateSecurity({ twoFactorEnabled: checked })
                  }
                />
                <Separator />
                <FormField
                  label="Session timeout"
                  htmlFor="sessionTimeout"
                  hint="Automatically sign out after inactivity."
                >
                  <Select
                    value={settings.security.sessionTimeout}
                    onValueChange={(value) => updateSecurity({ sessionTimeout: value })}
                  >
                    <SelectTrigger id="sessionTimeout" className="w-full sm:max-w-xs">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <Separator />
                <SettingRow
                  id="loginAlerts"
                  label="Login alerts"
                  description="Get notified when a new device signs in."
                  checked={settings.security.loginAlerts}
                  onCheckedChange={(checked) => updateSecurity({ loginAlerts: checked })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of your workspace.</CardDescription>
              </CardHeader>
              <CardContent className={cn("grid grid-cols-1", spacing[4], "md:grid-cols-2")}>
                <FormField label="Theme mode" htmlFor="themeMode" hint="Theme switching coming soon.">
                  <Select
                    value={settings.appearance.themeMode}
                    onValueChange={(value) => updateAppearance({ themeMode: value })}
                  >
                    <SelectTrigger id="themeMode" className="w-full">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Density" htmlFor="density">
                  <Select
                    value={settings.appearance.density}
                    onValueChange={(value) => updateAppearance({ density: value })}
                  >
                    <SelectTrigger id="density" className="w-full">
                      <SelectValue placeholder="Select density" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Layout preference" htmlFor="layoutPreference" className="md:col-span-2">
                  <Select
                    value={settings.appearance.layoutPreference}
                    onValueChange={(value) => updateAppearance({ layoutPreference: value })}
                  >
                    <SelectTrigger id="layoutPreference" className="w-full sm:max-w-md">
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default sidebar</SelectItem>
                      <SelectItem value="collapsed">Collapsed sidebar</SelectItem>
                      <SelectItem value="wide">Wide content</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account / Danger Zone */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage sessions and account lifecycle actions.</CardDescription>
              </CardHeader>
              <CardContent className={cn("flex flex-col", spacing[5])}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <p className={text.label}>Active sessions</p>
                    <p className={text.caption}>
                      Sign out from all devices except this one.
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleLogoutAllSessions}>
                    <LogOut className="size-4" />
                    Logout all sessions
                  </Button>
                </div>
                <Separator />
                <div
                  className={cn(
                    "border-destructive/20 flex flex-col gap-4 rounded-lg border p-5 sm:flex-row sm:items-center sm:justify-between",
                    bg.muted
                  )}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="text-destructive size-4 shrink-0" />
                      <p className={text.label}>Danger zone</p>
                    </div>
                    <p className={text.caption}>
                      Permanently delete your account and all associated data.
                    </p>
                  </div>
                  <Button variant="destructive" onClick={handleDeleteAccount} className="shrink-0">
                    <Trash2 className="size-4" />
                    Delete account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppContainer>
  )
}
