/* eslint-disable no-useless-catch */
import { useCallback } from "react";
import { useFetcher } from "../../useFetcher";

export interface Balance {
  investmentBalance: number;
  savingBalance: number;
}

const useBalance = () => {
  const getBalance = useCallback(async (): Promise<GlobalResponseData<Balance>> => {
    try {
      const response = await useFetcher({
        url: "/users-savings-investments-balance",
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching balance: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    getBalance,
  };
};

export default useBalance;
