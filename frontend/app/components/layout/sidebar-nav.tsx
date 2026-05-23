import { cn } from "@/lib/utils";
import type { Workspace } from "@/types";
import type { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router";

interface SidebarNavProps extends React.HtmlHTMLAttributes<HTMLElement> {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
  isCollapsed: boolean;
  currentWorkspace: Workspace | null;
  className?: string;
}
export const SidebarNav = ({
  items,
  isCollapsed,
  className,
  currentWorkspace,
  ...props
}: SidebarNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className={cn("flex flex-col gap-y-1", className)} {...props}>
      {items.map((el) => {
        const Icon = el.icon;
        const isActive = location.pathname === el.href;

        const handleClick = () => {
          if (el.href === "/workspaces") {
            navigate(el.href);
          } else if (currentWorkspace && currentWorkspace._id) {
            navigate(`${el.href}?workspaceId=${currentWorkspace._id}`);
          } else {
            navigate(el.href);
          }
        };

        return (
          <Button
            key={el.href}
            variant={isActive ? "secondary" : "ghost"}
            className={cn(
              "justify-start transition-all duration-200 relative group h-10",
              isActive &&
                "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium shadow-sm hover:bg-indigo-500/15",
              !isActive &&
                "text-muted-foreground hover:text-foreground hover:bg-accent/60"
            )}
            onClick={handleClick}
          >
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-gradient-to-b from-indigo-500 to-violet-500" />
            )}
            <Icon className={cn("mr-2 size-4 transition-colors", isActive ? "text-indigo-500" : "group-hover:text-foreground")} />
            {isCollapsed ? (
              <span className="sr-only">{el.title}</span>
            ) : (
              el.title
            )}
          </Button>
        );
      })}
    </nav>
  );
};
