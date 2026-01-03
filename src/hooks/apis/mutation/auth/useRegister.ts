import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
//
import { handleError } from "@/src/utils/helpers";
import { useFetcher } from "../../../useFetcher";
import { SignupFormValues } from "@/src/schema/auth.schema";

export const useRegister = () => {
  

  const register = async (data: SignupFormValues): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/auth/register",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  return useMutation<AuthResponseData, AxiosError<ErrorResponseData>, SignupFormValues>({
    mutationFn: register,
  });
};
