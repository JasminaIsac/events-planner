import { useAuth } from "~/auth/useAuth";
import { LoginForm } from "~/components/Forms";
import { LoadingIndicator } from "~/components/UI";
import { routePaths } from "~/utils/routePaths";

import { Navigate } from "react-router-dom";

import { CustomLink, PageHeader } from "./shared";

export default function LoginPage() {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <LoadingIndicator />;
  }

  if (isAuthenticated) {
    return <Navigate to={routePaths.Index} replace />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-4 gap-4">
        <PageHeader title="Welcome back" subtitle="Log in to your calendar" />

        <LoginForm />

        <CustomLink
          title="Don't have an account?"
          route={routePaths.register}
          linkText="Sign up"
        />
      </div>
    </div>
  );
}
