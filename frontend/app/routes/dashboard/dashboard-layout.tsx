import { Header } from "@/components/layout/header";
import { SidebarComponent } from "@/components/layout/sidebar-component";
import { Loader } from "@/components/loader";
import { CreateWorkspace } from "@/components/workspace/create-workspace";
import { fetchData } from "@/lib/fetch-util";
import { useGetWorkspacesQuery } from "@/hooks/use-workspace";
import { useAuth } from "@/provider/auth-context";
import type { Workspace } from "@/types";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate, useSearchParams } from "react-router";

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

  // Use React Query so workspaces are retried automatically after cold-start
  const { data: workspaces = [] } = useGetWorkspacesQuery() as {
    data: Workspace[];
  };

  // Auto-select first workspace once workspaces are loaded
  useEffect(() => {
    if (!workspaces || workspaces.length === 0) return;

    const workspaceId = searchParams.get("workspaceId");

    if (!workspaceId) {
      // No workspace in URL — navigate to the first one
      const first = workspaces[0];
      setCurrentWorkspace(first);
      navigate(`/dashboard?workspaceId=${first._id}`, { replace: true });
    } else if (!currentWorkspace) {
      // workspaceId is in URL (e.g. after page refresh) — restore state
      const found = workspaces.find((ws) => ws._id === workspaceId);
      if (found) setCurrentWorkspace(found);
    }
  }, [workspaces, searchParams]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  const handleWorkspaceSelected = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
  };

  return (
    <div className="flex h-screen w-full">
      <SidebarComponent currentWorkspace={currentWorkspace} />

      <div className="flex flex-1 flex-col h-full">
        <Header
          onWorkspaceSelected={handleWorkspaceSelected}
          selectedWorkspace={currentWorkspace}
          onCreateWorkspace={() => setIsCreatingWorkspace(true)}
          workspaces={workspaces}
        />

        <main className="flex-1 overflow-y-auto h-full w-full">
          <div className="mx-auto container px-2 sm:px-6 lg:px-8 py-0 md:py-8 w-full h-full">
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
