import { LayoutDashboard, GitBranch, Search, FolderOpen, Smartphone } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "管理后台", url: "/", icon: LayoutDashboard },
  { title: "循证链条中心", url: "/evidence-hub", icon: GitBranch },
  { title: "GEO 优化工具", url: "/geo-optimizer", icon: Search },
  { title: "数字资产库", url: "/assets", icon: FolderOpen },
  { title: "学术小册子", url: "/trust-card/idp", icon: Smartphone },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className={`p-4 ${collapsed ? "px-2" : ""}`}>
          <h1 className={`font-bold text-sidebar-foreground ${collapsed ? "text-xs text-center" : "text-lg"}`}>
            {collapsed ? "AL" : "Active-Link"}
          </h1>
          {!collapsed && (
            <p className="text-xs text-sidebar-foreground/70 mt-1">营养原料循证价值管理系统</p>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60">功能模块</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
