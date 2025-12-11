import { useAuth } from "../features/auth/hooks/useAuth.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const HomePage = () => {
  const { role } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (role === "SuperAdmin") {
      navigate("/super-admin/main");
    } else if (role === "Admin") {
      navigate("/admin/main");
    } else {
      navigate("/unauthorized");
    }
  }, [role, navigate]);

  return null;
};
