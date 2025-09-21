/* eslint-disable no-useless-catch */
import { useCallback } from "react";
import { useFetcher } from "../../useFetcher";

const useBankInfo = () => {
  const getBankList = useCallback(async (): Promise<GlobalResponseData<Bank[]>> => {
    try {
      const response = await useFetcher({
        url: "/utils/get-banks",
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching banks: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const getAccountName = useCallback(
    async ({
      accountNumber,
      bankCode,
    }: {
      accountNumber: string;
      bankCode: string;
    }): Promise<GlobalResponseData<BankAccount>> => {
      const params = new URLSearchParams();
      params.append("accountNumber", accountNumber);
      params.append("bankCode", bankCode);

      try {
        const response = await useFetcher({
          url: "/utils/verify-bank-account",
          useBaseUrl: true,
          params,
        });

        if (response.error) {
          throw new Error("Error getting account name: " + response.error?.message);
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    []
  );

  return {
    getBankList,
    getAccountName,
  };
};

export default useBankInfo;
