"use client";

import React, { useEffect, useState } from "react";
import WelcomeContainer from "./_components/WelcomeContainer";
import { useUser } from "@/app/provider";
import CreateOptions from "./_components/CreateOptions";
import LatestInterviewsList from "./_components/LatestInterviewsList";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        router.replace("/auth"); // not logged in, go to login
      } else {
        setLoading(false); // logged in, allow dashboard
      }
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* <WelcomeContainer /> */}
      <h2 className="my-3 font-bold text-2xl">Dashboard</h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  );
}

export default Dashboard;
