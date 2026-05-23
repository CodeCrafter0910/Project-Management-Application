import { useAuth } from "@/provider/auth-context";
import type { Workspace } from "@/types";
import { Button } from "../ui/button";
import { Bell, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Link, useLocation, useNavigate } from "react-router";
import { WorkspaceAvatar } from "../workspace/workspace-avatar";

interface HeaderProps {
  onWorkspaceSelected: (workspace: Workspace) => void;
  selectedWorkspace: Workspace | null;
  onCreateWorkspace: () => void;
  workspaces: Workspace[];
}

export const Header = ({
  onWorkspaceSelected,
  selectedWorkspace,
  onCreateWorkspace,
  workspaces,
}: HeaderProps) => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const isOnWorkspacePage = useLocation().pathname.includes("/workspace");

  const handleOnClick = (workspace: Workspace) => {
    onWorkspaceSelected(workspace);
    const location = window.location;

    if (isOnWorkspacePage) {
      navigate(`/workspaces/${workspace._id}`);
    } else {
      const basePath = location.pathname;
      navigate(`${basePath}?workspaceId=${workspace._id}`);
    }
  };

  return (
    <div className="bg-background/80 backdrop-blur-xl sticky top-0 z-40 border-b border-border/50">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} className="border-border/50 hover:bg-accent/60 transition-all duration-200 shadow-sm h-10">
              {selectedWorkspace ? (
                <>
                  {selectedWorkspace.color && (
                    <WorkspaceAvatar
                      color={selectedWorkspace.color}
                      name={selectedWorkspace.name}
                    />
                  )}
                  <span className="font-medium ml-1.5">{selectedWorkspace?.name}</span>
                </>
              ) : (
                <span className="font-medium text-muted-foreground">Select Workspace</span>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="shadow-xl border-border/50 min-w-[200px]" align="start">
            <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Workspaces
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />

            <DropdownMenuGroup>
              {workspaces?.map((ws) => (
                <DropdownMenuItem
                  key={ws._id}
                  onClick={() => handleOnClick(ws)}
                  className="cursor-pointer transition-colors py-2"
                >
                  {ws.color && (
                    <WorkspaceAvatar color={ws.color} name={ws.name} />
                  )}
                  <span className="ml-2.5 font-medium">{ws.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onCreateWorkspace} className="cursor-pointer py-2 group">
                <div className="w-6 h-6 rounded-md bg-indigo-500/10 flex items-center justify-center mr-2.5 group-hover:bg-indigo-500/20 transition-colors">
                  <PlusCircle className="w-4 h-4 text-indigo-500" />
                </div>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">Create Workspace</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative hover:bg-accent/60 transition-all rounded-full w-9 h-9">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 border-2 border-background" />
          </Button>

          <div className="h-6 w-[1px] bg-border/50 mx-1 hidden sm:block" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-accent/60 transition-colors">
                <span className="text-sm font-medium hidden sm:block mr-1">{user?.name?.split(' ')[0]}</span>
                <Avatar className="w-8 h-8 ring-2 ring-transparent hover:ring-indigo-500/30 transition-all duration-200">
                  <AvatarImage src={user?.profilePicture} alt={user?.name} />
                  <AvatarFallback className="bg-gradient-primary text-white text-sm font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="shadow-xl border-border/50 min-w-[220px]">
              <DropdownMenuLabel className="py-3 px-3">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-sm">{user?.name}</span>
                  <span className="text-xs text-muted-foreground font-normal">{user?.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem asChild className="cursor-pointer py-2.5">
                <Link to="/user/profile" className="w-full">Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem
                onClick={logout}
                className="text-destructive cursor-pointer focus:text-destructive py-2.5 focus:bg-destructive/10"
              >
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
