import { useEffect, useState } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { PublicLayout } from "../layouts/PublicLayout.jsx";
import { PrivateLayout } from "../layouts/PrivateLayout.jsx";
import { AuthPage } from "../../pages/AuthPage.jsx";
import { HomePage } from "../../pages/HomePage.jsx";
import { UnauthorizedPage } from "../../pages/UnauthorizedPage.jsx";
import { useAuth } from "../../features/auth/hooks/useAuth.jsx";
import { PageLoader } from "../components/PageLoader.jsx";
import { NotFoundPage } from "../../pages/NotFoundPage.jsx";
import { PinPage } from "../../pages/PinPage.jsx";
import { MainPage } from "../../pages/MainPage.jsx";
import { TransactionPage } from "../../pages/TransactionPage.jsx";
import { DangerPage } from "../components/DangerPage.jsx";
import { NotificationPage } from "../../pages/NotificationPage.jsx";
import {ContactsPage} from "../../pages/ContactsPage.jsx";

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
    return <Navigate to="/app/home" />;
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
    path: "/app",
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
        path: "pin",
        element: (
          <PrivateRoute>
            <PinPage />
          </PrivateRoute>
        ),
      },
      {
        path: "main",
        element: (
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        ),
      },
      {
        path: "transactions/:id",
        element: (
          <PrivateRoute>
            <TransactionPage />
          </PrivateRoute>
        ),
      },
      {
        path: "contacts",
        element: (
          <PrivateRoute>
            <ContactsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "loader",
        element: (
          <PrivateRoute>
            <DangerPage />
          </PrivateRoute>
        ),
      },
      {
        path: "notifications",
        element: (
          <PrivateRoute>
            <NotificationPage />
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
