/* eslint-disable no-useless-catch */
import { useCallback } from "react";
import { useFetcher } from "../../useFetcher";

export type ChatRoom = {
  _id: string;
  groupId: string;
  members: string[];
};

export type GetRoomsResponse = {
  success: boolean;
  rooms: ChatRoom[];
};

const useChats = () => {
  const getChatList = useCallback(async (): Promise<GetRoomsResponse> => {
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
