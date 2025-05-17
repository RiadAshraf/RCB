"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      alert("You need to log in before Registering for Marathon");
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}