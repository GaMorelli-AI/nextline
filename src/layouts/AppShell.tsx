import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/layouts/Sidebar";
import { Topbar } from "@/layouts/Topbar";
import { NextAIPanel, NextAIFloatingButton } from "@/features/nextai/NextAIPanel";

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-navy-950">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
      />
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-[94] bg-black/60 backdrop-blur-[1px] md:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
      <div className="flex min-h-screen w-full min-w-0 flex-1 flex-col">
        <Topbar onOpenMobileNav={() => setMobileNavOpen(true)} />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 md:px-8 md:py-7">
          <Outlet />
        </main>
      </div>
      <NextAIFloatingButton />
      <NextAIPanel />
    </div>
  );
}
