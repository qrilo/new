import { App } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth.jsx";
import { loginUserAPI } from "../authApi.jsx";

export const useLogin = () => {
  const { login } = useAuth();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: loginUserAPI,
    onSuccess: (data) => {
      login(data.token, data.role, data.pinLength, data.leadId);
    },
    onError: (error) => {
      //message.error(error.message);
    },
  });
};
