/* eslint-disable no-useless-catch */
import { useCallback } from "react";
import { useFetcher } from "../../useFetcher";

const useInvestments = () => {
  const getInvestments = useCallback(async (): Promise<GlobalResponseData<Investment[]>> => {
    try {
      const response = await useFetcher({
        url: "/investments/get-invests",
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching investments: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const getInvestment = useCallback(async (id: string): Promise<GlobalResponseData<Investment>> => {
    try {
      const response = await useFetcher({
        url: `/investments/invest/${id}`,
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching investment: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const getPersonalInvestments = useCallback(async (): Promise<
    GlobalResponseData<Investment[]>
  > => {
    try {
      const response = await useFetcher({
        url: "/investments/get-personal-invests",
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching personal investments: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const getGroupInvestments = useCallback(async (): Promise<GlobalResponseData<Investment[]>> => {
    try {
      const response = await useFetcher({
        url: "/investments/get-group-invests",
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching group investments: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const getSuggestedInvestments = useCallback(async (): Promise<
    GlobalResponseData<Investment[]>
  > => {
    try {
      const response = await useFetcher({
        url: "/investments/get-suggested-invests",
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching suggested investments: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const getActiveInvestments = useCallback(async (): Promise<GlobalResponseData<Investment[]>> => {
    try {
      const response = await useFetcher({
        url: "/investments/get-active-invests",
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching active investments: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const getAllInvestments = useCallback(async (): Promise<GlobalResponseData<InvestmentPlan[]>> => {
    try {
      const response = await useFetcher({
        url: "/investments/get-investments",
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching active investments: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    getInvestments,
    getInvestment,
    getPersonalInvestments,
    getGroupInvestments,
    getSuggestedInvestments,
    getActiveInvestments,
    getAllInvestments,
  };
};

export default useInvestments;
