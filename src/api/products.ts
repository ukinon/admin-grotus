import { Product } from "@/types/product";
import { axiosInstance } from "@/utils/axios";
import exp from "constants";

export async function getProducts(query: string) {
  const response = await axiosInstance.get(`/products${query}`);
  return response.data;
}

export async function addProduct(data: Product) {
  const response = await axiosInstance.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function updateProduct(data: Product) {
  const response = await axiosInstance.post(`/products/${data.id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
