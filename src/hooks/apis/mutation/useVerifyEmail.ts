import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
//

import { handleError } from "@/src/utils/helpers";
import { useFetcher } from "../../useFetcher";
import { VerifyFormValue } from "@/src/schema/auth.schema";
import useShowToast from "../../useShowToast";

export const useVerifyEmail = () => {
  const showToast = useShowToast();

  const verifyEmail = async (data: VerifyFormValue): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/auth/verify-email",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  return useMutation<AuthResponseData, AxiosError<ErrorResponseData>, VerifyFormValue>({
    mutationFn: verifyEmail,
  });
};
