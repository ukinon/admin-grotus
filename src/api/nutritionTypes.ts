import { axiosInstance } from "@/utils/axios";

export async function getNutritionTypes(query: string) {
  const response = await axiosInstance.get(`/nutrition-types${query}`);
  return response.data;
}
