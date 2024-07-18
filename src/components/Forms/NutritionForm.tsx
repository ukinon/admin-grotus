"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import FormInput from "../ui/FormInput";
import { Button } from "../ui/button";
import { usePostQuery } from "@/hooks/queries/usePostQuery";
import { User } from "@/types/user";
import { NutritionType } from "@/types/product";
import { addNutritionType, updateNutritionType } from "@/api/nutritionTypes";

const nutritionFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
});

type Props = {
  data?: NutritionType;
  disabled?: boolean;
};

export default function NutritionForm({ data, disabled }: Props) {
  const form = useForm<z.infer<typeof nutritionFormSchema>>({
    resolver: zodResolver(nutritionFormSchema),
    mode: "onChange",
    defaultValues: data
      ? {
          ...data,
          name: data?.name,
        }
      : {},
  });
  const {
    mutateAsync: updateNutritionMutation,
    isPending: updateNutritionPending,
  } = usePostQuery({
    mutationFn: async (values: NutritionType) =>
      await updateNutritionType({
        id: data?.id,
        ...values,
      }),
    successMessage: "Nutrition Type updated successfully",
    queryKey: ["get-nutrition-types"],
  });
  const { mutateAsync: addNutritionMutation, isPending: addNutritionPending } =
    usePostQuery({
      mutationFn: async (values: NutritionType) =>
        await addNutritionType(values),
      successMessage: "Nutrition Type added successfully",
      queryKey: ["get-nutrition-types"],
    });

  function onSubmit(values: z.infer<typeof nutritionFormSchema>) {
    if (!data) {
      return addNutritionMutation(values);
    }
    return updateNutritionMutation({
      ...values,
      id: data?.id,
    });
  }

  return (
    <div className="flex w-[30vw] flex-col items-center justify-center gap-5">
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
          </div>
          {!disabled && (
            <div className="flex flex-col gap-5">
              <Button
                type="submit"
                className="flex w-full gap-5 rounded-md bg-primary py-6 disabled:opacity-50"
                disabled={updateNutritionPending || addNutritionPending}
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
