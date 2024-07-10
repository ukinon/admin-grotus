import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDelete = ({
  path,
  queryKey,
}: {
  path: string;
  queryKey: [string, number?][];
}) => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteMutation,
    data: deleteData,
    isPending: deleteIsPending,
    error: deleteError,
    isSuccess: deleteIsSuccess,
  } = useMutation({
    mutationFn: async (id: number) =>
      await axiosInstance.delete(`/${path}/${id}`),
    onSuccess: () => {
      queryKey.map((item) => {
        queryClient.invalidateQueries({ queryKey: item });
      });
      toast({
        title: "Yay!",
        description: "Berhasil hapus",
      });
    },
    onError: () => {
      toast({
        title: "Oops!",
        description: "Gagal hapus",
      });
    },
  });
  return {
    deleteMutation,
    deleteData,
    deleteIsPending,
    deleteError,
    deleteIsSuccess,
  };
};
