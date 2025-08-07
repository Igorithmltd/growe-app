/* eslint-disable no-useless-catch */
import { useCallback } from "react";
import { useFetcher } from "../../useFetcher";

const useFinanceNotes = () => {
  const getAllFinanceNotes = useCallback(async (): Promise<GlobalResponseData<Note[]>> => {
    try {
      const response = await useFetcher({
        url: "/finances/get-user-notes",
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching finance notes: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const getNote = useCallback(async (id: string): Promise<GlobalResponseData<Note>> => {
    try {
      const response = await useFetcher({
        url: `/get-user-note/${id}`,
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching finance note: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);
  return { getAllFinanceNotes, getNote };
};

export default useFinanceNotes;
