import { cn } from "@/lib/utils";
import { useAuth } from "@/provider/auth-context";
import type { Workspace } from "@/types";
import {
  CheckCircle2,
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  ListCheck,
  LogOut,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { SidebarNav } from "./sidebar-nav";

export const SidebarComponent = ({
  currentWorkspace,
}: {
  currentWorkspace: Workspace | null;
}) => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Workspaces",
      href: "/workspaces",
      icon: Users,
    },
    {
      title: "My Tasks",
      href: "/my-tasks",
      icon: ListCheck,
    },
    {
      title: "Members",
      href: `/members`,
      icon: Users,
    },
    {
      title: "Achieved",
      href: `/achieved`,
      icon: CheckCircle2,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col border-r border-border/50 bg-sidebar transition-all duration-300 relative",
        isCollapsed ? "w-16 md:w-[80px]" : "w-16 md:w-[260px]"
      )}
    >
      {/* Subtle gradient accent at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" />

      <div className="flex h-14 items-center border-b border-border/50 px-4 mb-2">
        <Link to="/dashboard" className="flex items-center">
          {!isCollapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-md shadow-indigo-500/15">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg hidden md:block tracking-tight">
                TaskHub
              </span>
            </div>
          )}

          {isCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-md shadow-indigo-500/15">
              <Zap className="w-4 h-4 text-white" />
            </div>
          )}
        </Link>

        <Button
          variant={"ghost"}
          size="icon"
          className="ml-auto hidden md:flex hover:bg-accent/80 transition-colors text-muted-foreground hover:text-foreground"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronsRight className="size-4" />
          ) : (
            <ChevronsLeft className="size-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        <SidebarNav
          items={navItems}
          isCollapsed={isCollapsed}
          className={cn(isCollapsed && "items-center space-y-2")}
          currentWorkspace={currentWorkspace}
        />
      </ScrollArea>

      {/* Bottom section with user info */}
      <div className="border-t border-border/50 p-3">
        <Button
          variant={"ghost"}
          size={isCollapsed ? "icon" : "default"}
          onClick={logout}
          className={cn(
            "w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200",
            !isCollapsed && "justify-start"
          )}
        >
          <LogOut className="size-4" />
          {!isCollapsed && <span className="hidden md:block ml-2 font-medium">Logout</span>}
        </Button>
      </div>
    </div>
  );
};
