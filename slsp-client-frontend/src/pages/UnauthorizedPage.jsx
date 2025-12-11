import {useNavigate} from "react-router";
import {useEffect} from "react";

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth");

  }, []);

  return null;
};
