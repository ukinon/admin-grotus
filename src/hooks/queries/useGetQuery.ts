import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type Props = {
  queryFn: () => Promise<AxiosResponse>;
  queryKey: [string, string?];
};

export function useGetQuery({ queryFn, queryKey }: Props) {
  const { data, isLoading } = useQuery({
    queryFn: async () => await queryFn(),
    queryKey: queryKey,
  });

  return { data, isLoading };
}
