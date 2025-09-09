/* eslint-disable no-useless-catch */
import { useCallback } from "react";
import { useFetcher } from "../../useFetcher";

const useSavings = () => {
  const getSavingGroups = useCallback(async (): Promise<GlobalResponseData<Savings[]>> => {
    try {
      const response = await useFetcher({
        url: "/savings/all-groups-savings",
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

  const getPersonalSavings = useCallback(async (): Promise<GlobalResponseData<Savings[]>> => {
    try {
      const response = await useFetcher({
        url: "/savings/all-personal-savings",
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching personal savings: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const getActiveSavings = useCallback(async (): Promise<GlobalResponseData<Savings[]>> => {
    try {
      const response = await useFetcher({
        url: "/savings/all-active-savings",
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching active savings: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const getPopularSavings = useCallback(async (): Promise<GlobalResponseData<Savings[]>> => {
    try {
      const response = await useFetcher({
        url: "/savings/popular-savings",
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching popular savings: " + response.error?.message);
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

  return { getSavingGroups, getSaving, getPersonalSavings, getActiveSavings, getPopularSavings };
};

export default useSavings;
