"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  Tag, 
  Users, 
  ChevronDown, 
  ChevronUp,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Define navigation items for reuse
export const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
  { name: "Events", href: "/admin/events", icon: <Calendar className="h-5 w-5" /> },
  { name: "Categories", href: "/admin/categories", icon: <Tag className="h-5 w-5" /> },
];

interface AdminNavigationProps {
  // Optional props that can be passed to customize the navigation
  title?: string;
  onSignOut?: () => void;
}

export default function AdminNavigation({ title = "RCB Admin", onSignOut }: AdminNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    } else {
      console.log("Sign out clicked - implement functionality");
    }
  };

  return (
    <>
      {/* Mobile Navigation Header */}
      <div className="md:hidden bg-white p-4 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">{title}</h1>
        <Button 
          variant="ghost" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1"
        >
          {mobileMenuOpen ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <nav className="px-4 py-2">
            {navigationItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 my-1 rounded-md text-sm ${
                  pathname === item.href 
                    ? "bg-blue-100 text-blue-700" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col bg-white border-r h-screen fixed">
        <div className="p-6">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <nav className="px-4 flex-1">
          {navigationItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-2 px-4 py-3 my-1 rounded-md ${
                pathname === item.href 
                  ? "bg-blue-100 text-blue-700" 
                  : "hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-600 gap-2"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  );
}