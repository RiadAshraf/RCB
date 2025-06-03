"use client";

import React, { useState } from "react";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const handleSignOut = () => {
    // Handle sign out logic here
    console.log("Signing out...");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Reusable Admin Navigation Component */}
      <AdminNavigation onSignOut={handleSignOut} />

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-500">Welcome to RCB Admin Panel</p>
            </header>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="pb-2">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                  {/* Additional cards... */}
                  {/* Rest of your dashboard content... */}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}