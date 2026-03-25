import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
//

import { handleError } from "@/src/utils/helpers";
import { useFetcher } from "../../../useFetcher";
import { BVNFormValues, NINFormValues } from "@/src/schema/kyc.schema";
import useShowToast from "@/src/hooks/useShowToast";

export const useKyc = () => {
  const showToast = useShowToast();

  const verifyBvn = async (data: BVNFormValues): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/utils/verify-bvn",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  const verifyNin = async (data: NINFormValues): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/utils/verify-nin",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  const bvnMutation = useMutation<AuthResponseData, AxiosError<ErrorResponseData>, BVNFormValues>({
    mutationFn: verifyBvn,
    onError: (error) => {
      if (error.response) {
        const errorData = error.response.data;
        showToast({
          title: "Error",
          description: errorData.message || "Failed to send message",
          status: "error",
        });
      } else if (error.request) {
        showToast({
          title: "Network Error",
          description: "No response received from the server, try again",
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
        title: "Success",
        description: "Identity verification successful",
        status: "success",
      });
    },
  });

  const ninMutation = useMutation<AuthResponseData, AxiosError<ErrorResponseData>, NINFormValues>({
    mutationFn: verifyNin,
    onError: (error) => {
      if (error.response) {
        const errorData = error.response.data;
        showToast({
          title: "Error",
          description: errorData.message || "Failed to send message",
          status: "error",
        });
      } else if (error.request) {
        showToast({
          title: "Network Error",
          description: "No response received from the server, try again",
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
        title: "Success",
        description: "Identity verification successful",
        status: "success",
      });
    },
  });

  return { bvnMutation, ninMutation };
};
