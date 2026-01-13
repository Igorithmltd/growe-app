/* eslint-disable no-useless-catch */
import { useCallback } from "react";
import { useFetcher } from "../../useFetcher";

type GetChatMessagesParams = {
  roomId: string;
  afterTime?: string;
  beforeTime?: string;
  page?: number;
  limit?: number;
};

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

  const getChatMessages = useCallback(
    async ({
      roomId,
      afterTime,
      beforeTime,
      page = 1,
      limit = 50,
    }: GetChatMessagesParams): Promise<GlobalResponseData<any>> => {
      try {
        const response = await useFetcher({
          url: `/chat/get-chat-messages/${roomId}`,
          params: {
            afterTime,
            beforeTime,
            page,
            limit,
          },
          useBaseUrl: true,
        });

        if (response.error) {
          throw new Error("Error fetching chat messages: " + response.error?.message);
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    []
  );

  return {
    getChatList,
    getChatMessages,
  };
};

export default useChats;
