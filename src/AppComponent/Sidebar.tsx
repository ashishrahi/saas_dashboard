import { SidebarItem } from "@/components/design-system/sidebar-item";
import { SidebarSection } from "@/components/design-system/sidebar-section";
import { APP_NAV_ITEMS } from "@/lib/navigation/app-routes";
import LogoImage from '@/assets/logo.png';

export default function Sidebar({ collapsed, onClose }: { collapsed: boolean; onClose?: () => void }) {
  return (
    <div
      className={`bg-sidebar text-sidebar-foreground border-sidebar-border flex h-full shrink-0 flex-col border-r transition-all duration-200 ease-in-out ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="border-sidebar-border flex items-center gap-3 border-b px-4 py-5">
        {!collapsed && (
          <img src={LogoImage} alt="Logo" className="max-h-10 object-contain brightness-0 invert" />
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <SidebarSection>
          {APP_NAV_ITEMS.map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.title}
              collapsed={collapsed}
              onNavigate={onClose}
              children={item.children}
            />
          ))}
        </SidebarSection>
      </nav>
    </div>
  );
}
