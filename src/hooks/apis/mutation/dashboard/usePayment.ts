import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
//

import { handleError } from "@/src/utils/helpers";
import { useFetcher } from "../../../useFetcher";
import useShowToast from "../../../useShowToast";

type ActionType = "savings" | "investments";

export type PaymentValues = {
  email: string;
  amount: string;
  actionType: ActionType;
  actionId: string;
};

type PaystackAuthorizationData = {
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

export const usePayment = () => {
  const showToast = useShowToast();

  const makePayment = async (data: PaymentValues): Promise<PaystackAuthorizationData> => {
    const response = await useFetcher({
      url: "/utils/initialize-payment",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  return useMutation<PaystackAuthorizationData, AxiosError<ErrorResponseData>, PaymentValues>({
    mutationFn: makePayment,
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
          title: "Payment Initialized",
          description: "Redirecting to payment gateway...",
          status: "success",
        });
    },
  });
};
