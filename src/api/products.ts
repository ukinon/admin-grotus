import { axiosInstance } from "@/utils/axios";

export async function getProducts(query: string) {
  const response = await axiosInstance.get(`/products${query}`);
  return response.data;
}
