import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { useFetcher } from "../../../useFetcher";
import { handleError } from "@/src/utils/helpers";
import useShowToast from "../../../useShowToast";

export type SendMessageValues = {
  groupId: string;
  receiverId?: string;
  message: string;
  type?: "text" | "image" | "file";
};

export const useChatMutation = () => {
  const showToast = useShowToast();

  const sendMessage = async (
    data: SendMessageValues
  ): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/chat/send-message",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  const { mutate: sendChatMessage, isPending: isSendingMessage } =
    useMutation<
      AuthResponseData,
      AxiosError<ErrorResponseData>,
      SendMessageValues
    >({
      mutationFn: sendMessage,
      onError: (error) => {
        if (error.response) {
          const errorData = error.response.data;
          showToast({
            title: "Error",
            description:
              errorData.message || "Failed to send message",
            status: "error",
          });
        } else if (error.request) {
          showToast({
            title: "Network Error",
            description:
              "No response received from the server, try again",
            status: "warning",
          });
        } else {
          showToast({
            title: "Error",
            description: error.message || "An unknown error occurred",
            status: "error",
          });
        }
      },
      onSuccess: () => {
        showToast({
          title: "Sent",
          description: "Message sent successfully",
          status: "success",
        });
      },
    });

  return {
    sendChatMessage,
    isSendingMessage,
  };
};
