import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/AppComponent/Header";
import Sidebar from "@/AppComponent/Sidebar";

export default function MainLayout() {

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setCollapsed((c) => !c);
  const toggleMobile = () => setMobileOpen((s) => !s);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen">
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          mobileOpen ? "" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`absolute left-0 top-0 bottom-0 w-72 bg-white shadow-lg transform transition-transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar collapsed={false} onClose={() => setMobileOpen(false)} />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Header with both toggles */}
        <Header 
          onToggleMobile={toggleMobile}
          onToggleCollapse={toggleSidebar}
        />

        <main className="p-4 md:p-6 flex-1 overflow-auto">
          <div className="max-w-full mx-auto">


            <Outlet />

          </div>
        </main>
      </div>
    </div>
  );
}
