import { LoadingIndicator } from "~/components/UI";
import { routePaths } from "~/utils/routePaths";

import { Navigate, Outlet } from "react-router-dom";

import { hasRole } from "./roleUtils";
import { useAuth } from "./useAuth";

type ProtectedRouteProps = {
  roles?: string[];
};

export function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <LoadingIndicator />;
  }

  if (!isAuthenticated) {
    return <Navigate to={routePaths.login} replace />;
  }

  if (roles && roles.length > 0) {
    const allowed = roles.some((role) => hasRole(role));

    if (!allowed) {
      return <Navigate to={routePaths.Index} replace />;
    }
  }

  return <Outlet />;
}
