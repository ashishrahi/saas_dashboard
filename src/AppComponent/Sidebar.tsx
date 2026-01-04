import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Users, TypeIcon } from "lucide-react";
import LogoImage from '@/assets/logo.png';
const navItems = [
  { title: "Home", to: "/", icon: <Home className="h-4 w-4" /> },
  { title: "Users", to: "/users", icon: <Users className="h-4 w-4" /> },
  { title: "Features", to: "/features", icon: <TypeIcon className="h-4 w-4" /> },
];

export default function Sidebar({ collapsed, onClose }: { collapsed: boolean; onClose?: () => void }) {
  return (
    <aside
      className={`bg-white border-r border-slate-200 h-full flex-shrink-0 transition-all duration-200 ease-in-out ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="px-4 py-5 flex items-center gap-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
                
            {!collapsed &&<img src={LogoImage} alt="Logo" className="object-contain" />}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  collapsed ? "justify-center" : ""
                } ${isActive ? "bg-black text-white" : "text-slate-800 hover:bg-slate-100"}`
              }
            >
              <div className="text-slate-600">{item.icon}</div>
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-100">
          <Button size="sm" className="w-full">
            {!collapsed ? "New Project" : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
}
