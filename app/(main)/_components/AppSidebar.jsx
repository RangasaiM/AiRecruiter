"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SideBarOptions } from "@/services/Constants";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";

export function AppSidebar() {
  const path = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth");
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center mt-5">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={200}
          height={100}
          className="w-[150px]"
        />
        <Button className="w-full mt-5">
          <Plus /> Create New Interview
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SideBarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className="p-1">
                  <SidebarMenuButton
                    asChild
                    className={`p-5 ${path == option.path && "bg-blue-50"}`}
                  >
                    <Link href={option.path}>
                      <option.icon
                        className={`${path == option.path && "text-primary"}`}
                      />
                      <span
                        className={`text-[16px] font-medium ${
                          path == option.path && "text-primary"
                        }`}
                      >
                        {option.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="p-1">
            <SidebarMenuButton
              className="p-5 hover:bg-red-50 text-red-600"
              onClick={handleLogout}
            >
              <>
                <LogOut className="w-5 h-5 mr-2" />
                <span className="text-[16px] font-medium">Logout</span>
              </>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
