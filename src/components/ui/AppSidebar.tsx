"use client"

import { ChartArea, Coins, History, Home, LayoutDashboard } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LogoutButton } from "./LogoutButton"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import axios from 'axios'
import { User } from "@/types/user"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/transactions",
    icon: LayoutDashboard,
  },
  {
    title: "All transactions",
    url: "/all-transactions",
    icon: History,
  },
  {
    title: "Charts",
    url: "/charts",
    icon: ChartArea,
  },
  {
    title: "Budget",
    url: "/budget",
    icon: Coins,
  },
]

export default function AppSidebar() {

  const [userData, setUserData] = useState<User>();

  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    ; (
      async () => {
        const user = await axios.post("/api/users/aboutme");
        setUserData(user.data.data);
      }
    )()
  }, [pathname])

  if (isAuthPage) {
    return (
      <div></div>
    );
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Logged in as :</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="ml-2 text-2xl font-bold">
                {
                  userData ? userData.name : "Your UserName"
                }
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Personal Transaction Visualizer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <LogoutButton />
      </SidebarContent>
    </Sidebar>
  )
}
