"use client";
import { NutritionType, Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import FormInput from "../ui/FormInput";
import { Button } from "../ui/button";
import { usePostQuery } from "@/hooks/queries/usePostQuery";
import { addProduct, updateProduct } from "@/api/products";
import Loader from "../common/Loader";
import { Input } from "../ui/input";
import SelectInput from "../ui/SelectInput";
import { getNutritionTypes } from "@/api/nutritionTypes";
import { useGetQuery } from "@/hooks/queries/useGetQuery";

const productFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  price: z.coerce.number({ required_error: "Price is required" }),
  stock: z.coerce.number({ required_error: "Stock is required" }),
  description: z.string({ required_error: "Description is required" }),
  nutrition_types: z.array(
    z.coerce.number({ required_error: "Nutrition type is required" }),
  ),
});

export type FileUploadState = {
  images: File[] | Blob[] | MediaSource[] | null;
};

type Props = {
  data?: Product;
  disabled?: boolean;
};

export default function TransactionForm({ data, disabled }: Props) {
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    mode: "onChange",
    defaultValues: data
      ? {
          ...data,
          nutrition_types: data.nutrition_types?.map(
            (type: NutritionType) => type.id,
          ),
        }
      : {},
  });
  const [currentImage, setCurrentImage] = useState<FileUploadState>({
    images: null,
  });

  const { mutateAsync: addProductMutation, isPending: addProductPending } =
    usePostQuery({
      mutationFn: async (values: Product) => await addProduct(values),
      successMessage: "Product added successfully",
      queryKey: ["get-products"],
    });
  const { data: nutritionTypes } = useGetQuery({
    queryFn: async () => await getNutritionTypes("?perPage=100000000"),
    queryKey: ["get-nutrition-types"],
  });
  const {
    mutateAsync: updateProductMutation,
    isPending: updateProductPending,
  } = usePostQuery({
    mutationFn: async (values: Product) => await updateProduct(values),
    successMessage: "Product updated successfully",
    queryKey: ["get-products"],
  });

  let nutritionOptions = [];
  if (nutritionTypes) {
    nutritionOptions = nutritionTypes.data.data.map((type: NutritionType) => ({
      label: type.name,
      value: type.id,
    }));
  }

  function onSubmit(values: z.infer<typeof productFormSchema>) {
    if (!data) {
      return addProductMutation({
        ...values,
        images: currentImage.images,
      });
    }
    return updateProductMutation({ ...values, id: data.id });
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, files } = event.currentTarget;
    if (name && files && files.length > 0) {
      setCurrentImage((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  }

  console.log(data);

  return (
    <div className="flex w-[30vw] justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[90%] space-y-8"
        >
          <div className="flex flex-col gap-4 ">
            <FormInput
              form={form}
              name="name"
              label="Name"
              disabled={disabled}
              required
            />
            <FormInput
              form={form}
              type="number"
              name="price"
              label="Price"
              disabled={disabled}
              isCurrency
              required
            />
            <FormInput
              form={form}
              type="number"
              name="stock"
              label="Stock"
              disabled={disabled}
              required
            />
            <FormInput
              form={form}
              name="description"
              label="Description"
              type="textarea"
              disabled={disabled}
              required
            />
            <label className="text-sm font-semibold">Product Images</label>
            <Input
              className=" w-full border border-black"
              id="picture"
              name="images"
              type="file"
              multiple
              onChange={handleFileChange}
              disabled={disabled}
              accept=".jpg, .png, .jpeg"
            />
            <SelectInput
              label="Nutrition Types"
              form={form}
              name="nutrition_types"
              defaultVal={data?.nutrition_types?.map(
                (type: NutritionType) => type.id as number,
              )}
              options={nutritionOptions}
              multiple
            />
          </div>
          {!disabled && (
            <div className="flex flex-col gap-5">
              <Button
                type="submit"
                className="flex w-full gap-5 rounded-md bg-primary py-6 disabled:opacity-50"
                disabled={addProductPending || updateProductPending}
              >
                Simpan
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
