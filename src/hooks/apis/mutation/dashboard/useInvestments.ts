import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
//

import { handleError } from "@/src/utils/helpers";
import { useFetcher } from "../../../useFetcher";
import useShowToast from "../../../useShowToast";
import {
  CreateInvestmentGroupValues,
  JoinInvestmentGroupValues,
} from "@/src/schema/investments.schema";

export const useSavings = () => {
  const showToast = useShowToast();

  const createGroup = async (data: CreateInvestmentGroupValues): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/auth/forgot-password",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  const joinGroup = async (data: JoinInvestmentGroupValues): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/auth/forgot-password",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  const { mutate: createInvestmentGroup, isPending: isCreatingGroup } = useMutation<
    AuthResponseData,
    AxiosError<ErrorResponseData>,
    CreateInvestmentGroupValues
  >({
    mutationFn: createGroup,
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
        description: "Savings Group created successfully",
        status: "success",
      });
    },
  });

  const { mutate: joinInvestmentGroup, isPending: isJoiningGroup } = useMutation<
    AuthResponseData,
    AxiosError<ErrorResponseData>,
    JoinInvestmentGroupValues
  >({
    mutationFn: joinGroup,
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
        description: "Joined group successfully",
        status: "success",
      });
    },
  });

  return {
    createInvestmentGroup,
    isCreatingGroup,
    joinInvestmentGroup,
    isJoiningGroup,
  };
};
