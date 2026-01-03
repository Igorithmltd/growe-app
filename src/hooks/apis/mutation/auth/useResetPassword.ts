import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
//

import { handleError } from "@/src/utils/helpers";
import { useFetcher } from "../../../useFetcher";
import { ResetFormValues } from "@/src/schema/auth.schema";
import useShowToast from "../../../useShowToast";

export const useResetPassword = () => {
  const showToast = useShowToast();

  const resetPassword = async (data: ResetFormValues): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/auth/reset-password",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  return useMutation<AuthResponseData, AxiosError<ErrorResponseData>, ResetFormValues>({
    mutationFn: resetPassword,
    onError: (error) => {
      if (error.response) {
        const errorData = error.response.data;
        showToast({
          title: "Error",
          description: errorData.message || "Something went wrong on the server",
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
        description: "Logged in successfully.",
        status: "success",
      });
    },
  });
};
