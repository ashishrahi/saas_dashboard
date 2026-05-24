import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/AppComponent/Header";
import Sidebar from "@/AppComponent/Sidebar";
import { AppBreadcrumb } from "@/components/design-system/app-breadcrumb";
import { GlobalSearch } from "@/components/design-system/global-search";
import { NotificationCenter } from "@/components/design-system/notification-center";
import { useBreadcrumbs } from "@/lib/navigation/use-breadcrumbs";
import { bg, border } from "@/lib/theme/colors";
import { shadow } from "@/lib/theme/shadows";
import { transition } from "@/lib/theme/transitions";
import { zIndex } from "@/lib/theme/z-index";
import { cn } from "@/lib/utils";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const breadcrumbs = useBreadcrumbs();

  const toggleSidebar = () => setCollapsed((c) => !c);
  const toggleMobile = () => setMobileOpen((s) => !s);

  return (
    <GlobalSearch>
    <NotificationCenter>
    <div className="bg-background text-heading flex h-dvh overflow-hidden">
      <div
        className={cn(
          "hidden h-full shrink-0 md:flex md:sticky md:top-0 md:self-start",
          transition.transform,
          collapsed ? "w-16" : "w-64"
        )}
      >
        <Sidebar collapsed={collapsed} />
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          mobileOpen ? "visible" : "invisible"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-overlay/40",
            transition.opacity,
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />

        <div
          className={cn(
            "bg-sidebar absolute top-0 left-0 h-full w-72",
            shadow.modal,
            transition.transform,
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Sidebar collapsed={false} onClose={() => setMobileOpen(false)} />
        </div>
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          onToggleMobile={toggleMobile}
          onToggleCollapse={toggleSidebar}
        />

        <div
          className={cn(
            bg.card,
            "sticky shrink-0 border-b",
            border.default,
            "px-4 py-3 md:px-6",
            zIndex.sticky,
            "top-16"
          )}
        >
          <div className="mx-auto w-full max-w-[1600px]">
            <AppBreadcrumb items={breadcrumbs} />
          </div>
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6">
          <div className="mx-auto w-full max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
    </NotificationCenter>
    </GlobalSearch>
  );
}
