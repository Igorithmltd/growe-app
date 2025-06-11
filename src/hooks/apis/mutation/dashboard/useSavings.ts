import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
//

import { handleError } from "@/src/utils/helpers";
import { useFetcher } from "../../../useFetcher";
import useShowToast from "../../../useShowToast";
import { CreateGroupValues, SavingsGoalValues } from "@/src/schema/savings.schema";

export const useSavings = () => {
  const showToast = useShowToast();

  const createGoal = async (data: SavingsGoalValues): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/auth/forgot-password",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  const createGroup = async (data: CreateGroupValues): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/auth/forgot-password",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  const { mutate: createSavingsGoal, isPending: isCreatingGoal } = useMutation<
    AuthResponseData,
    AxiosError<ErrorResponseData>,
    SavingsGoalValues
  >({
    mutationFn: createGoal,
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
        description: "Savings Goal created successfully",
        status: "success",
      });
    },
  });

  const { mutate: createSavingGroup, isPending: isCreatingGroup } = useMutation<
    AuthResponseData,
    AxiosError<ErrorResponseData>,
    CreateGroupValues
  >({
    mutationFn: createGoal,
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

  return { createSavingsGoal, isCreatingGoal, createSavingGroup, isCreatingGroup };
};
