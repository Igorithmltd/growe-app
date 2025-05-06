import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
//

import { handleError } from "@/src/utils/helpers";
import { useFetcher } from "../../useFetcher";
import { VerifyFormValue } from "@/src/schema/auth.schema";
import useShowToast from "../../useShowToast";

export const useForgotPassword = () => {
  const showToast = useShowToast();

  const forgotPass = async (data: VerifyFormValue): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/auth/forgot-password",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  const verifyOtp = async (data: { email: string; otp: string }): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/auth/verify-password-otp",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  const { mutate: forgotPassword, isPending } = useMutation<
    AuthResponseData,
    AxiosError<ErrorResponseData>,
    VerifyFormValue
  >({
    mutationFn: forgotPass,
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
        description: "Reset email sent successfully.",
        status: "success",
      });
    },
  });

  const { mutate: verifyPasswordOtp, isPending: isVerifying } = useMutation<
    AuthResponseData,
    AxiosError<ErrorResponseData>,
    { email: string; otp: string }
  >({
    mutationFn: verifyOtp,
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
        description: "OTP verified successfully.",
        status: "success",
      });
    },
  });

  return { forgotPassword, verifyPasswordOtp, isPending, isVerifying };
};
