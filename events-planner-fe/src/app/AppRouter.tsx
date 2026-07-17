import { ProtectedRoute } from "~/auth/ProtectedRoute";
import { NotFound } from "~/components/NotFound";
import { CalendarPage, LoginPage, RegisterPage } from "~/pages";
import { routePaths } from "~/utils/routePaths";

import { Route, Routes } from "react-router-dom";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={routePaths.login} element={<LoginPage />} />
      <Route path={routePaths.register} element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path={routePaths.Index} element={<CalendarPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
