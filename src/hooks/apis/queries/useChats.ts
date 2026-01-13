/* eslint-disable no-useless-catch */
import { useCallback } from "react";
import { useFetcher } from "../../useFetcher";



const useChats = () => {
  const getChatList = useCallback(async (): Promise<GlobalResponseData<ChatRoom[]>> => {
    try {
      const response = await useFetcher({
        url: "/chat/get-chat-rooms",
        useBaseUrl: true,
      });

      if (response.error) {
        throw new Error("Error fetching chats: " + response.error?.message);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    getChatList,
  };
};

export default useChats;
