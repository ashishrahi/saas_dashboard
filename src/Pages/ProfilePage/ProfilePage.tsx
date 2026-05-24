import { Pencil, Shield, KeyRound, Globe } from "lucide-react"
import { AppContainer } from "@/AppComponent/AppContainer"
import { PageHeader } from "@/components/design-system/page-header"
import { FormField } from "@/components/design-system/form-field"
import { StatusBadge } from "@/components/design-system/status-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useProfileData } from "@/hooks/CustomHook/useProfileData"
import { cn } from "@/lib/utils"
import { spacing } from "@/lib/theme/spacing"
import { text } from "@/lib/theme/typography"

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <span className={text.caption}>{label}</span>
      <span className={cn(text.body, "font-medium")}>{value}</span>
    </div>
  )
}

export default function ProfilePage() {
  const { profile, updatePreferences } = useProfileData()

  const handleEditProfile = () => {
    // Placeholder for edit flow / API integration
    console.log("Edit profile")
  }

  return (
    <AppContainer>
      <div className={cn("flex flex-col", spacing[6])}>
        <PageHeader
          title="Profile"
          description="Manage your personal information, security, and account preferences."
        />

        {/* Profile Header */}
        <Card className="lg:col-span-2">
          <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <Avatar className="size-20">
                <AvatarFallback className="bg-primary-soft text-heading text-xl font-semibold">
                  {profile.initials}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
                  <h3 className={text.h3}>{profile.fullName}</h3>
                  <StatusBadge status={profile.status} />
                </div>
                <p className={text.body}>{profile.role}</p>
                <p className={text.caption}>{profile.email}</p>
              </div>
            </div>
            <Button onClick={handleEditProfile} className="shrink-0">
              <Pencil className="size-4" />
              Edit profile
            </Button>
          </CardContent>
        </Card>

        <div className={cn("grid grid-cols-1", spacing[6], "lg:grid-cols-2")}>
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your account details and organizational info.</CardDescription>
            </CardHeader>
            <CardContent className={cn("grid grid-cols-1", spacing[4])}>
              <FormField label="Full Name" htmlFor="fullName">
                <Input id="fullName" value={profile.fullName} readOnly />
              </FormField>
              <FormField label="Email" htmlFor="email">
                <Input id="email" type="email" value={profile.email} readOnly />
              </FormField>
              <FormField label="Phone" htmlFor="phone">
                <Input id="phone" value={profile.phone} readOnly />
              </FormField>
              <FormField label="Designation / Role" htmlFor="role">
                <Input id="role" value={profile.role} readOnly />
              </FormField>
              <FormField label="Department" htmlFor="department">
                <Input id="department" value={profile.department} readOnly />
              </FormField>
              {profile.employeeId && (
                <FormField label="Employee ID" htmlFor="employeeId">
                  <Input id="employeeId" value={profile.employeeId} readOnly />
                </FormField>
              )}
            </CardContent>
          </Card>

          {/* Security Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Security Summary</CardTitle>
              <CardDescription>Overview of your account security status.</CardDescription>
            </CardHeader>
            <CardContent className={cn("flex flex-col", spacing[4])}>
              <InfoRow
                label="Password"
                value={`Last changed ${profile.security.passwordLastChanged}`}
              />
              <Separator />
              <InfoRow label="Last login" value={profile.security.lastLogin} />
              <Separator />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className={text.caption}>Two-factor authentication</span>
                <StatusBadge
                  status={profile.security.twoFactorEnabled ? "Enabled" : "Disabled"}
                />
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <Shield className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                <p className={text.body}>{profile.security.loginActivitySummary}</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button variant="outline" size="sm">
                  <KeyRound className="size-4" />
                  Change password
                </Button>
                <Button variant="secondary" size="sm">
                  View login activity
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Preferences */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
              <CardDescription>Customize your language, timezone, and notifications.</CardDescription>
            </CardHeader>
            <CardContent className={cn("grid grid-cols-1", spacing[4], "md:grid-cols-2")}>
              <FormField label="Language" htmlFor="language">
                <Select
                  value={profile.preferences.language}
                  onValueChange={(value) => updatePreferences({ language: value })}
                >
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Timezone" htmlFor="timezone">
                <Select
                  value={profile.preferences.timezone}
                  onValueChange={(value) => updatePreferences({ timezone: value })}
                >
                  <SelectTrigger id="timezone" className="w-full">
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
              <FormField label="Theme preference" htmlFor="theme">
                <Select
                  value={profile.preferences.theme}
                  onValueChange={(value) => updatePreferences({ theme: value })}
                >
                  <SelectTrigger id="theme" className="w-full">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Notification preference" htmlFor="notifications">
                <Select
                  value={profile.preferences.notifications}
                  onValueChange={(value) => updatePreferences({ notifications: value })}
                >
                  <SelectTrigger id="notifications" className="w-full">
                    <SelectValue placeholder="Select notifications" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All notifications</SelectItem>
                    <SelectItem value="important">Important only</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </CardContent>
            <CardContent className="border-divider border-t pt-0">
              <div className="flex items-center gap-2 pt-5">
                <Globe className="text-muted-foreground size-4" />
                <p className={text.caption}>
                  Preferences are saved locally until API integration is connected.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppContainer>
  )
}
