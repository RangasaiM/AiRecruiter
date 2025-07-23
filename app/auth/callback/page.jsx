"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        return;
      }
      if (data.session) {
        // User is signed in, redirect to dashboard
        router.replace("/dashboard");
      } else {
        // Not signed in, maybe redirect to login or show error
        router.replace("/auth");
      }
    };

    handleRedirect();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
