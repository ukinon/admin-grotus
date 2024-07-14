import { NutritionType } from "@/types/product";
import { axiosInstance } from "@/utils/axios";

export async function getNutritionTypes(query: string) {
  const response = await axiosInstance.get(`/nutrition-types${query}`);
  return response.data;
}

export async function addNutritionType(data: NutritionType) {
  const response = await axiosInstance.post("/nutrition-types", data);
  return response.data;
}

export async function updateNutritionType(data: NutritionType) {
  const response = await axiosInstance.patch(
    `/nutrition-types/${data.id}`,
    data,
  );
  return response.data;
}
