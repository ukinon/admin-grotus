import { User } from "@/types/user";
import { axiosInstance } from "@/utils/axios";

export async function getUsers(query: string) {
  const response = await axiosInstance.get(`/users${query}`);
  return response.data;
}

export async function addUser(data: User) {
  const response = await axiosInstance.post("/users", data);
  return response.data;
}

export async function updateUser(data: User) {
  const response = await axiosInstance.post(`/users/${data.id}`, data);
  return response.data;
}
