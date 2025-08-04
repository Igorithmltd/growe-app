/* eslint-disable no-useless-catch */
import { useCallback } from "react";
import { useFetcher } from "../../useFetcher";

const useSavings = () => {
  const getSavingGroups = useCallback(async (): Promise<GlobalResponseData<Savings[]>> => {
    try {
      const response = await useFetcher({
        url: "/savings",
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching savings groups: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const getSaving = useCallback(async (id: string): Promise<GlobalResponseData<Savings>> => {
    try {
      const response = await useFetcher({
        url: `/product/${id}`,
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching product: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);
  return { getSavingGroups, getSaving };
};

export default useSavings;
