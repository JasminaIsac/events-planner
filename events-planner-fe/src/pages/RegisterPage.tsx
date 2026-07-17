import { useAuth } from "~/auth/useAuth";
import { RegisterForm } from "~/components/Forms";
import { LoadingIndicator } from "~/components/UI";
import { CustomLink, PageHeader } from "~/pages/shared";
import { routePaths } from "~/utils/routePaths";

import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <LoadingIndicator />;
  }

  if (isAuthenticated) {
    return <Navigate to={routePaths.Index} replace />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md py-8 px-4 gap-4">
        <PageHeader
          title="Create an account"
          subtitle="Get started with your calendar"
        />

        <RegisterForm />

        <CustomLink
          title="Already have an account?"
          route={routePaths.login}
          linkText="Sign in "
        />
      </div>
    </div>
  );
}
