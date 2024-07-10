import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type Props = {
  mutationFn: (args: unknown) => Promise<AxiosResponse>;
  successMessage: string;
};

export function usePostQuery({ mutationFn, successMessage }: Props) {
  const { mutateAsync, isPending, isSuccess, data } = useMutation({
    mutationFn: (args: unknown) => mutationFn(args),

    onSuccess: () => {
      toast({
        title: "Yay!",
        description: successMessage,
      });
    },

    onError: () => {
      toast({
        title: "Oops!",
        description: "Terjadi kesalahan",
      });
    },
  });

  return { mutateAsync, isPending, isSuccess, data };
}
