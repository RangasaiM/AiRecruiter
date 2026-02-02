import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from './_components/AppSidebar'
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";
import ProtectedRoute from "@/components/ProtectedRoute";

function DashboardProvider({ children }) {
    return (
        <ProtectedRoute>
            <SidebarProvider>
                <AppSidebar />
                <div className="w-full p-10">
                    <SidebarTrigger />
                    <WelcomeContainer />
                    {children}
                </div>
            </SidebarProvider>
        </ProtectedRoute>
    )
}

export default DashboardProvider