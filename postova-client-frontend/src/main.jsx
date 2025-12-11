import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./features/auth/providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { router } from "./shared/router/router.jsx";
import "@ant-design/v5-patch-for-react-19";
import { App } from "antd";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </App>
  </QueryClientProvider>
);
