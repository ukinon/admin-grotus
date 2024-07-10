import { axiosInstance } from "@/utils/axios";

export async function getUsers(query: string) {
  const response = await axiosInstance.get(`/users${query}`);
  return response.data;
}
