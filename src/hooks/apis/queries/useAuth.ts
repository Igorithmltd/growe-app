import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFetcher } from "../../useFetcher";
import { handleError } from "@/src/utils/helpers";
//


const useAdmin = () => {
  const fetchUser = useCallback(async (): Promise<
    GlobalResponseData<any>
  > => {
    try {
      const response = await useFetcher({
        url: "/user/get-account",
        requestType: "GET",
        useBaseUrl: true,
      });

      if (response.error) {
        throw handleError(response.error);
      }

      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  }, []);
  return { fetchUser };
};

export function useAuth() {
  const { fetchUser } = useAdmin();

  const { data, error, isPending, isFetching, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await fetchUser();
    },
  });

  return { data, error, isPending, isFetching, refetch };
}
