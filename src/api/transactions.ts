import { Transaction } from "@/types/transaction";
import { axiosInstance } from "@/utils/axios";

export async function getTransactions(query: string) {
  const response = await axiosInstance.get(`/transactions${query}`);
  return response.data;
}

export async function addTransaction(data: Transaction) {
  const response = await axiosInstance.post("/transactions", data);
  return response.data;
}

export async function updateTransaction(data: Transaction) {
  const response = await axiosInstance.put(`/transactions/${data.id}`, data);
  return response.data;
}
