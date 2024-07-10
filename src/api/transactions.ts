import { axiosInstance } from "@/utils/axios";

export async function getTransactions(query: string) {
  const response = await axiosInstance.get(`/transactions${query}`);
  return response.data;
}
