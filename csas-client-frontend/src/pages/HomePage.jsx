import { useAuth } from "../features/auth/hooks/useAuth.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const HomePage = () => {
  const { role } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (role === "Bank") {
      navigate("/app/pin");
    } else {
      navigate("/unauthorized");
    }
  }, [role, navigate]);

  return null;
};
