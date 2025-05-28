"use client";

import { supabase } from "@/services/supabaseClient";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";

function Provider({ children }) {
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) return;

      const { data: Users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user.email);

      if (Users?.length === 0) {
        await supabase.from("Users").insert([
          {
            name: user.user_metadata?.name,
            email: user.email,
            picture: user.user_metadata?.picture,
          },
        ]);
      }
    };

    fetchUser();
  }, []);

  return <div>{children}</div>;
}

export default Provider;
