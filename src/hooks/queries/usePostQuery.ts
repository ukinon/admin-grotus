import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type Props<T> = {
  mutationFn: (values: T) => Promise<AxiosResponse>;
  successMessage: string;
  queryKey: [string, number?];
};

export function usePostQuery<T>({
  mutationFn,
  successMessage,
  queryKey,
}: Props<T>) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isSuccess, data } = useMutation({
    mutationFn: mutationFn,

    onSuccess: () => {
      console.log(queryKey);
      queryClient.invalidateQueries({ queryKey: queryKey });
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
