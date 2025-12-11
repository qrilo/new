import { useEffect, useState } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { PublicLayout } from "../layouts/PublicLayout.jsx";
import { PrivateLayout } from "../layouts/PrivateLayout.jsx";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { HomePage } from "../../pages/HomePage.jsx";
import { UnauthorizedPage } from "../../pages/UnauthorizedPage.jsx";
import { useAuth } from "../../features/auth/hooks/useAuth.jsx";
import { SuperAdminMainPage } from "../../pages/SuperAdminMainPage.jsx";
import { PageLoader } from "../components/PageLoader.jsx";
import { NotFoundPage } from "../../pages/NotFoundPage.jsx";
import { AccountsPage } from "../../features/accounts/pages/AccountsPage.jsx";
import { BanksPage } from "../../features/banks/pages/BanksPage.jsx";
import { NotificationsPage } from "../../features/notifications/pages/NotificationsPage.jsx";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, role } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth" />,
      },
      {
        path: "auth",
        element: (
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "home",
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: "super-admin/main",
        element: (
          <PrivateRoute allowedRoles={["SuperAdmin"]}>
            <SuperAdminMainPage />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/main",
        element: (
          <PrivateRoute allowedRoles={["Admin"]}>
            <BanksPage />
          </PrivateRoute>
        ),
      },
      {
        path: "banks/:id/:bankType/accounts",
        element: (
          <PrivateRoute allowedRoles={["Admin"]}>
            <AccountsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "banks/:id/:bankType/notifications",
        element: (
          <PrivateRoute allowedRoles={["Admin"]}>
            <NotificationsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
