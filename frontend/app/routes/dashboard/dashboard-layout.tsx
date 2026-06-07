import { Header } from "@/components/layout/header";
import { SidebarComponent } from "@/components/layout/sidebar-component";
import { Loader } from "@/components/loader";
import { CreateWorkspace } from "@/components/workspace/create-workspace";
import { fetchData } from "@/lib/fetch-util";
import { useGetWorkspacesQuery } from "@/hooks/use-workspace";
import { useAuth } from "@/provider/auth-context";
import type { Workspace } from "@/types";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate, useSearchParams } from "react-router";

export const clientLoader = async () => {
  try {
    const workspaces = await fetchData("/workspaces");
    return { workspaces };
  } catch (error) {
    // Return empty — React Query inside the component will retry
    return { workspaces: [] };
  }
};

const DashboardLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Use React Query so workspaces are retried automatically after cold-start
  const { data: workspaces = [] } = useGetWorkspacesQuery() as {
    data: Workspace[];
  };

  // Auto-select first workspace once workspaces are loaded
  useEffect(() => {
    if (!workspaces || workspaces.length === 0) return;

    const workspaceId = searchParams.get("workspaceId");

    if (!workspaceId) {
      // Only auto-redirect to dashboard with the first workspace if we are currently on the dashboard path
      if (location.pathname === "/dashboard") {
        const first = workspaces[0];
        setCurrentWorkspace(first);
        navigate(`/dashboard?workspaceId=${first._id}`, { replace: true });
      }
    } else {
      // Ensure currentWorkspace is synchronized with the workspaceId in the URL
      const found = workspaces.find((ws) => ws._id === workspaceId);
      if (found && (!currentWorkspace || currentWorkspace._id !== workspaceId)) {
        setCurrentWorkspace(found);
      }
    }
  }, [workspaces, searchParams, location.pathname, currentWorkspace]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  const handleWorkspaceSelected = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <SidebarComponent currentWorkspace={currentWorkspace} />

      <div className="flex flex-1 flex-col h-full overflow-hidden relative">
        <Header
          onWorkspaceSelected={handleWorkspaceSelected}
          selectedWorkspace={currentWorkspace}
          onCreateWorkspace={() => setIsCreatingWorkspace(true)}
          workspaces={workspaces}
        />

        <main className="flex-1 overflow-y-auto h-full w-full bg-background/50 relative z-0">
          {/* Subtle gradient background for the main content area */}
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/5 via-background to-background" />
          
          <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-6 md:py-8 w-full h-full animate-fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </div>
  );
};

export default DashboardLayout;
