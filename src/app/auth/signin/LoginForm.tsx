"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { RxEnvelopeClosed, RxLockClosed } from "react-icons/rx";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import FormInput from "@/components/ui/FormInput";
import { usePostQuery } from "@/hooks/queries/usePostQuery";
import { login } from "@/api/auth";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });
  const { data, isPending, isSuccess, mutateAsync } = usePostQuery({
    mutationFn: () => login(form.getValues()),
    successMessage: "Login berhasil",
    queryKey: ["get-current-user"],
  });
  const signIn = useSignIn();

  const handleLogin = async (data: z.infer<typeof loginFormSchema>) => {
    mutateAsync(data);
  };

  useEffect(() => {
    if (isSuccess) {
      if (
        signIn({
          auth: {
            token: data?.data.access_token,
            type: data?.data.token_type,
          },
        })
      ) {
        window.location.replace("/");
      }
    }
  }, [isSuccess, data, signIn]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="flex w-full flex-col items-center gap-3 md:w-[30vw]"
      >
        <FormInput
          form={form}
          type="email"
          icon={<RxEnvelopeClosed />}
          placeholder="Email"
          name="email"
        />
        <FormInput
          form={form}
          type="password"
          icon={<RxLockClosed />}
          placeholder="Password"
          name="password"
        />{" "}
        <Button className="w-full bg-primary text-white" disabled={isPending}>
          Sign In
        </Button>
      </form>
    </Form>
  );
}
