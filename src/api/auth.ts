import { axiosInstance } from "@/utils/axios";
import { Login } from "@/types/auth";

export const login = async (data: Login) => {
  const response = await axiosInstance.post("/auth/login", data);
  console.log(response);
  return response;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.post("/auth/me");
  return response.data;
};
