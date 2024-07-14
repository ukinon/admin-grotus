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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { updateUser } from "@/api/users";

const userFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string().nullable().optional(),
  address: z.string({ required_error: "Address is required" }),
  birth_date: z.string({ required_error: "Birth Date is required" }),
  preferred_payment: z.string().nullable().optional(),
});

export type FileUploadState = {
  profile_photo: File | Blob | MediaSource | null;
};

type Props = {
  data?: User;
  disabled?: boolean;
};

export default function UserForm({ data, disabled }: Props) {
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
    defaultValues: data
      ? {
          ...data,
          name: data.profile?.name,
          email: data.email,
          address: data.profile?.address as string,
          birth_date: data.profile?.birth_date,
          preferred_payment: data.profile?.preferred_payment,
        }
      : {},
  });
  const [currentImage, setCurrentImage] = useState<FileUploadState>({
    profile_photo: null,
  });

  const { mutateAsync: updateUserMutation, isPending: updateUserPending } =
    usePostQuery({
      mutationFn: async (values: User) => await updateUser(values),
      successMessage: "Product updated successfully",
      queryKey: ["get-users"],
    });

  function onSubmit(values: z.infer<typeof userFormSchema>) {
    return updateUserMutation({
      ...values,
      id: data?.id,
      profile_photo: currentImage.profile_photo,
    });
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
    <div className="flex w-[30vw] flex-col items-center justify-center gap-5">
      {!data && !currentImage.profile_photo && (
        <div className="h-[30vw] w-[30vw] md:h-[10vw] md:w-[10vw]">
          <img
            src="https://via.placeholder.com/300x300"
            className="h-full w-full rounded-full object-cover "
            alt="Preview"
          />
        </div>
      )}
      {data && !currentImage.profile_photo && (
        <div className="h-[30vw] w-[30vw] md:h-[10vw] md:w-[10vw]">
          <img
            src={data?.profile?.profile_photo as string}
            className="h-full w-full rounded-full object-cover "
            alt="Preview"
          />
        </div>
      )}
      {currentImage.profile_photo && (
        <div className="h-[30vw] w-[30vw] md:h-[10vw] md:w-[10vw]">
          <img
            src={URL.createObjectURL(currentImage.profile_photo as MediaSource)}
            className="h-full w-full rounded-full object-contain"
            alt="Preview"
          />
        </div>
      )}

      <Label
        htmlFor="profile_photo"
        className="cursor-pointer text-base underline"
      >
        Change Picture
      </Label>
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
              name="email"
              label="Email"
              disabled={disabled}
              required
            />
            <FormInput
              form={form}
              type="password"
              name="password"
              label="Password"
              disabled={disabled}
              required
            />
            <FormInput
              form={form}
              name="address"
              label="Address"
              type="textarea"
              disabled={disabled}
              required
            />
            <FormInput
              form={form}
              name="birth_date"
              label="Birth Date"
              type="date"
              disabled={disabled}
              required
            />

            <Input
              className="hidden w-full border border-black"
              id="profile_photo"
              name="profile_photo"
              type="file"
              multiple
              onChange={handleFileChange}
              disabled={disabled}
              accept=".jpg, .png, .jpeg"
            />
          </div>
          {!disabled && (
            <div className="flex flex-col gap-5">
              <Button
                type="submit"
                className="flex w-full gap-5 rounded-md bg-primary py-6 disabled:opacity-50"
                disabled={updateUserPending}
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
