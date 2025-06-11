import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
//

import { handleError } from "@/src/utils/helpers";
import { useFetcher } from "../../../useFetcher";
import useShowToast from "../../../useShowToast";
import {
  CreateGroupValues,
  EditGroupValues,
  JoinGroupValues,
  SavingsGoalValues,
  VerifyInviteValues,
} from "@/src/schema/savings.schema";

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

  const editGroup = async (data: EditGroupValues): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/auth/forgot-password",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  const verifyInvite = async (data: VerifyInviteValues): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/auth/forgot-password",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  const joinGroup = async (data: JoinGroupValues): Promise<AuthResponseData> => {
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

  const { mutate: verifyGroupInviteCode, isPending: isVerifying } = useMutation<
    AuthResponseData,
    AxiosError<ErrorResponseData>,
    VerifyInviteValues
  >({
    mutationFn: verifyInvite,
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
        description: "Savings Group edited successfully",
        status: "success",
      });
    },
  });

  const { mutate: editSavingGroup, isPending: isEditingGroup } = useMutation<
    AuthResponseData,
    AxiosError<ErrorResponseData>,
    EditGroupValues
  >({
    mutationFn: editGroup,
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
        description: "Invite code successfully",
        status: "success",
      });
    },
  });

  const { mutate: joinSavingGroup, isPending: isJoiningGroup } = useMutation<
    AuthResponseData,
    AxiosError<ErrorResponseData>,
    JoinGroupValues
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
    createSavingsGoal,
    isCreatingGoal,
    createSavingGroup,
    isCreatingGroup,
    editSavingGroup,
    isEditingGroup,
    verifyGroupInviteCode,
    isVerifying,
    joinSavingGroup,
    isJoiningGroup,
  };
};
